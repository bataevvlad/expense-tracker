// eslint-disable-next-line @typescript-eslint/no-require-imports
const { join } = require('path')

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin')

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/api'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
  devServer: {
    proxy: {
      context: ['/api'],
      target: 'http://localhost:3333',
    }
  }
}
