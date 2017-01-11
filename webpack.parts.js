/* eslint-disable import/no-extraneous-dependencies, comma-dangle */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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

exports.extractCSS = function extractCSS(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.(scss|sass)$/,
          // Restrict extraction process to the given
          // paths.
          include: paths,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!fast-sass-loader',
          }),
        },
      ],
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('styles/[name].css'),
    ],
  };
};

exports.purifyCSS = function purifyCSS(paths) {
  const files = Array.isArray(paths) ? paths : [paths];

  return {
    plugins: [
      new PurifyCSSPlugin({
        // Our paths are absolute so Purify needs patching
        // against that to work.
        basePath: '/',

        // `paths` is used to point PurifyCSS to files not
        // visible to Webpack. This expects glob patterns so
        // we adapt here.
        paths: files.map(path => `${path}/*`),

        // Walk through only html files within node_modules. It
        // picks up .js files by default!
        resolveExtensions: ['.html'],
        purifyOptions: {
          info: true,
          minify: true,
        },
      }),
    ],
  };
};

exports.generateSourcemaps = function generateSourcemaps(type) {
  return {
    devtool: type,
  };
};


exports.extractBundles = function extractBundles() {
  // const entry = {};
  // const names = [];
  //
  // // Set up entries and names.
  // bundles.forEach(({ name, entries }) => {
  //   if (entries) {
  //     entry[name] = entries;
  //   }
  //
  //   names.push(name);
  // });

  return {
    // Define an entry point needed for splitting.
    // entry,
    plugins: [
      // Extract bundles.
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module, count) => {
          const userRequest = module.userRequest;

          // You can perform other similar checks here too.
          // Now we check just node_modules.
          return userRequest && userRequest.includes('node_modules');
        }
      }),
    ],
  };
};

exports.loadJavaScript = function loadJavaScript(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: paths,

          loader: 'babel-loader',
          options: {
            // Enable caching for improved performance during
            // development.
            // It uses default OS directory by default. If you need
            // something more custom, pass a path to it.
            // I.e., { cacheDirectory: '<path>' }
            cacheDirectory: true
          }
        }
      ]
    }
  };
};

exports.clean = function clean(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path])
    ]
  };
};
