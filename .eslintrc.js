module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@nx',
    '@typescript-eslint',
    'import',
    'react',
    'react-hooks',
    'prettier',
  ],
  extends: [
    'plugin:@nx/react',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  ignorePatterns: [
    '**/dist',
    'public',
    '.cache',
    'node_modules',
    '**/__tests__/**/*',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-console': 'warn',
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    '@nx/enforce-module-boundaries': [
      'error',
      {
        enforceBuildableLibDependency: true,
        allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
        depConstraints: [
          {
            sourceTag: '*',
            onlyDependOnLibsWithTags: ['*'],
          },
        ],
      },
    ],

    'prettier/prettier': 0,
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-first-prop-new-line': 'error',
    'react/jsx-max-props-per-line': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        variables: false,
      },
    ],
    'no-unused-vars': 'off',
    'object-curly-spacing': ['error', 'always'],
    'one-var': 'off',
    'no-multi-assign': 'off',
    'no-nested-ternary': 'off',
    'no-undef': 'off',
    'global-require': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: '@/*',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
      },
    },
  ],
}
