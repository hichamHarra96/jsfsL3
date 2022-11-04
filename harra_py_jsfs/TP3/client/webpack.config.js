const path = require('path');
const webpack  = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const PRODUCTION = true;

module.exports = {
  entry: path.resolve(__dirname, 'src', 'scripts', 'pong.js'),
  mode : (PRODUCTION ? 'production' : 'development'),

  output: {
    path: (PRODUCTION ? path.resolve(__dirname, '../server/public') : path.resolve(__dirname, 'dist')),
    filename: 'scripts/bundle.js'
  },

  mode : (PRODUCTION ? 'production' : 'development'),
  devtool : (PRODUCTION ? undefined : 'eval-source-map'),

  devServer: { 
    static: {
      publicPath: path.resolve(__dirname, 'dist'),
      watch: true
    }, 
    host: 'localhost',
    port: 8080,
    open: true 
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: "./index.html",
      hash: true,
    }),  
      new CopyPlugin({
        patterns: [
          {
            context: path.resolve(__dirname, 'src', 'images'),
            from: '**/*',
            to: 'images/[name][ext]',
            noErrorOnMissing: true,
          },
          {
            context: path.resolve(__dirname, 'src', 'style'),
            from: '**/*.css',
            to: 'style/[name][ext]',
            noErrorOnMissing: true,
          },
        ]
      }),
    ],
}
