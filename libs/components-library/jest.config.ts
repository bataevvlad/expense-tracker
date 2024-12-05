module.exports = {
  displayName: 'components-library',
  preset: 'react-native',
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleNameMapper: {
    '\\.svg$': '@nx/react-native/plugins/jest/svg-mock',
    '^@gorhom/bottom-sheet$': 'libs/mocks/@gorhom/bottom-sheet/index.ts',
  },
  transform: {
    '^.+.(js|ts|tsx)$': [
      'babel-jest',
      {
        configFile: __dirname + '/.babelrc.js',
      },
    ],
    '^.+.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve(
      'react-native/jest/assetFileTransformer.js'
    ),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-reanimated|react-navigation|@react-navigation/.*)/)',
  ],
  coverageDirectory: '../../coverage/libs/components-library',
}
