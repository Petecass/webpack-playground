/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');

exports.devServer = function devServer(options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,

      // Don't refresh if hot loading fails. If you want
      // refresh behavior, set inline: true instead.
      hotOnly: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port, // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        // Disabled as this won't work with html-webpack-template yet
        // multiStep: true
      }),
    ],
  };
};

exports.lintJavaScript = function JSlint(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: paths,
          use: 'eslint-loader',
          enforce: 'pre',
        },
      ],
    },
  };
};

exports.styles = function styles(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.(scss|sass)$/,
          include: paths,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'fast-sass-loader'],
        },
      ],
    },
  };
};
