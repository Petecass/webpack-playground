/* eslint comma-dangle: "off" */
// Trailing comma breaks nodemon server

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const common = merge(
  {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    //
    // Entries have to resolve to files! It relies on Node.js
    // convention by default so if a directory contains *index.js*,
    // it will resolve to that.
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
  parts.lintJavaScript(PATHS.app)
);

module.exports = function masterConfig(env) {
  return merge(
    common,
    {
      performance: {
        hints: false,
      },
      plugins: [
        new webpack.NamedModulesPlugin(),
      ],
    },
    parts.styles(),
    parts.devServer({
      host: process.env.HOST,
      port: process.env.PORT
    })
  );
};
