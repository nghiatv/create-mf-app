const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const deps = require('../../ts/package.json').dependencies
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const path = require('path')

const PORT = {{PORT}}

const devConfig = {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: PORT,
    historyApiFallback: true,
  },
  output: {
    publicPath: `http://localhost:${PORT}/`,
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "{{SAFE_NAME}}",
      library: { type: 'var', name: "{{SAFE_NAME}}" },
      filename: 'remoteEntry.js',
      exposes: {
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-router-dom'],
        },
      },
      remotes: {
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.dev.html',
    }),
  ],
}

module.exports = merge(commonConfig, devConfig)
