// babel-plugin-track-multiple-renders.js

/**
 * This Babel plugin automatically inserts a runtime counter into
 * any React functional component that looks like:
 *
 *    function MyComponent() { return <JSX> }
 *
 * or
 *
 *    const MyComponent = () => { return <JSX> }
 *
 * The component name must start with an uppercase letter and
 * contain JSX in its body. Once recognized, we inject a call to
 * a `trackRenders(componentName)` at the very start of that component.
 *
 * The plugin also injects a small helper function in the file (only once
 * per file) that:
 *   - Uses a global object `globalThis.__renderCounts` to store counts.
 *   - Logs "MyComponent is rendered 2 times!" (etc.) for the 2nd+ render.
 */

function trackMultipleRendersBabelPlugin({ types: t }) {
  return {
    name: 'babel-plugin-track-multiple-renders',
    visitor: {
      // We store the information whether we've found ANY React components
      // in this file in the 'state' argument for the plugin visitor.
      Program(path, state) {
        // If this property is not set, initialize it:
        if (typeof state.__foundReactComponents === 'undefined') {
          state.__foundReactComponents = false
        }
      },

      /**
       * Visits named function declarations like:
       *  function MyComponent(props) { return <JSX> }
       */
      FunctionDeclaration(path, state) {
        if (isLikelyReactComponent(path)) {
          state.__foundReactComponents = true
          injectRenderTrackerForFunction(path, t)
        }
      },

      /**
       * Visits arrow function expressions in variable declarations like:
       *   const MyComponent = (props) => { return <JSX> }
       */
      VariableDeclarator(path, state) {
        if (isLikelyReactArrowComponent(path)) {
          state.__foundReactComponents = true
          injectRenderTrackerForArrow(path, t)
        }
      },

      /**
       * When we exit the Program node, if we've found at least one
       * React component in this file, we insert the helper function
       * that manages the global counter. We do this exactly once per file.
       */
      Program: {
        exit(path, state) {
          if (state.__foundReactComponents) {
            insertGlobalHelper(path, state, t)
          }
        },
      },
    },
  }
}

function isLikelyReactComponent(functionPath) {
  const { node } = functionPath
  if (!node.id || !node.id.name) return false

  const functionName = node.id.name
  const isCapitalized = /^[A-Z]/.test(functionName)
  if (!isCapitalized) return false

  return functionContainsJSX(functionPath)
}

function isLikelyReactArrowComponent(variableDeclaratorPath) {
  const { node } = variableDeclaratorPath
  if (!node.id || !node.id.name) return false

  const variableName = node.id.name
  const isCapitalized = /^[A-Z]/.test(variableName)
  if (!isCapitalized) return false

  if (!node.init || node.init.type !== 'ArrowFunctionExpression') return false

  // Check if the body has JSX
  const arrowFnPath = variableDeclaratorPath.get('init')
  return functionContainsJSX(arrowFnPath)
}

function functionContainsJSX(functionOrArrowPath) {
  let foundJSX = false

  functionOrArrowPath.traverse({
    JSXElement() {
      foundJSX = true
    },
    JSXFragment() {
      foundJSX = true
    },
  })

  return foundJSX
}

function injectRenderTrackerForFunction(functionPath, t) {
  const functionName = functionPath.node.id.name

  if (functionPath.node.body.type === 'BlockStatement') {
    functionPath.node.body.body.unshift(createTrackCallNode(t, functionName))
  } else {
    // If there's no block, wrap it in one.
    const originalBody = functionPath.node.body
    functionPath.node.body = t.blockStatement([
      createTrackCallNode(t, functionName),
      t.returnStatement(originalBody),
    ])
  }
}

function injectRenderTrackerForArrow(variableDeclaratorPath, t) {
  const functionName = variableDeclaratorPath.node.id.name
  const arrowFnPath = variableDeclaratorPath.get('init')

  if (arrowFnPath.node.body.type === 'BlockStatement') {
    arrowFnPath.node.body.body.unshift(createTrackCallNode(t, functionName))
  } else {
    const originalBody = arrowFnPath.node.body
    arrowFnPath.node.body = t.blockStatement([
      createTrackCallNode(t, functionName),
      t.returnStatement(originalBody),
    ])
  }
}

function createTrackCallNode(t, componentName) {
  return t.expressionStatement(
    t.callExpression(t.identifier('trackRenders'), [
      t.stringLiteral(componentName),
    ])
  )
}

function insertGlobalHelper(path, state, t) {
  // If we've already inserted the helper into this file, skip.
  if (state.file.__didInsertGlobalHelper) {
    return
  }
  state.file.__didInsertGlobalHelper = true

  const globalCountsInitialization = t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(t.identifier('globalThis'), t.identifier('__renderCounts')),
      t.logicalExpression(
        '||',
        t.memberExpression(t.identifier('globalThis'), t.identifier('__renderCounts')),
        t.objectExpression([])
      )
    )
  )

  const trackRendersFunc = t.functionDeclaration(
    t.identifier('trackRenders'),
    [t.identifier('compName')],
    t.blockStatement([
      // globalThis.__renderCounts[compName] =
      //    (globalThis.__renderCounts[compName] || 0) + 1;
      t.expressionStatement(
        t.assignmentExpression(
          '=',
          t.memberExpression(
            t.memberExpression(
              t.identifier('globalThis'),
              t.identifier('__renderCounts')
            ),
            t.identifier('compName'),
            /* computed */ true
          ),
          t.binaryExpression(
            '+',
            t.logicalExpression(
              '||',
              t.memberExpression(
                t.memberExpression(t.identifier('globalThis'), t.identifier('__renderCounts')),
                t.identifier('compName'),
                /* computed */ true
              ),
              t.numericLiteral(0)
            ),
            t.numericLiteral(1)
          )
        )
      ),
      // const times = globalThis.__renderCounts[compName];
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier('times'),
          t.memberExpression(
            t.memberExpression(t.identifier('globalThis'), t.identifier('__renderCounts')),
            t.identifier('compName'),
            /* computed */ true
          )
        ),
      ]),
      // if (times >= 2) {
      //    console.log(`${compName} is rendered ${times} times!`);
      // }
      t.ifStatement(
        t.binaryExpression('>=', t.identifier('times'), t.numericLiteral(2)),
        t.blockStatement([
          t.expressionStatement(
            t.callExpression(
              t.memberExpression(t.identifier('console'), t.identifier('log')),
              [
                t.templateLiteral(
                  [
                    t.templateElement({ raw: '' }),
                    t.templateElement({ raw: ' is rendered ' }),
                    t.templateElement({ raw: ' times!' }, true),
                  ],
                  [t.identifier('compName'), t.identifier('times')]
                ),
              ]
            )
          ),
        ])
      ),
    ])
  )

  // Insert them at the very top of the file
  path.node.body.unshift(trackRendersFunc)
  path.node.body.unshift(globalCountsInitialization)
}

module.exports = trackMultipleRendersBabelPlugin
