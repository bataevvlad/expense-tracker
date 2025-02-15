module.exports = function(fileInfo, api) {
  const j = api.jscodeshift // jscodeshift API
  const root = j(fileInfo.source)

  root.find(j.CallExpression, {
    callee: {
      type: 'Identifier',
      name: 'oldFunction',
    },
  })
    .forEach(path => {
      path.node.callee.name = 'newFunction'
    })

  return root.toSource({ quote: 'single' })
}
