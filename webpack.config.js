const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {
  // Bundle the transpiled code in dist
  entry: {
    lib: resolve('./src/index.js')
  },

  // Generate a bundle in dist folder
  output: {
    path: resolve('./dist'),
    filename: 'index.js',
    library: 'mjolnir.js',
    libraryTarget: 'umd'
  },

  // Exclude any non-relative imports from resulting bundle
  externals: [
    /^[a-z\-0-9]+$/
  ],

  resolve: {
    alias: {
      'mjolnir.js': resolve('./dist')
    }
  },

  module: {
    rules: []
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ]
};
