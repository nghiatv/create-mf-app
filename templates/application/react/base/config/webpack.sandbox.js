const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const deps = require('../../ts/package.json').dependencies
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

const sandboxConfig = {
  mode: 'production',
  output: {
    publicPath:
      'https://admin-nextgen.vuiapp.nanofin.tech/module/{{SAFE_NAME}}/',
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: '{{SAFE_NAME}}',
      library: { type: 'var', name: '{{SAFE_NAME}}' },
      filename: 'remoteEntry.js',
      exposes: {},
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
      remotes: {},
    }),
    new HtmlWebpackPlugin({
      template: './public/index.prod.html',
    }),
  ],
}

module.exports = merge(commonConfig, sandboxConfig)
