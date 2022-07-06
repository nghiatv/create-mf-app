const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const deps = require('../package.json').dependencies
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const path = require('path')
// Sua thi comment lai roi moi thay doi
const PORT = {{PORT}}

const devConfig = {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: PORT,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },
  output: {
    publicPath: `http://localhost:${PORT}/`,
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: '{{SAFE_NAME}}',
      library: { type: 'var', name: '{{SAFE_NAME}}' },
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App'
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom']
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-router-dom']
        }
      },
      remotes: {
        appshell: 'appshell'
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.dev.html'
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
