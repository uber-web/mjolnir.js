const {resolve} = require('path');

const config = {
  lint: {
    paths: ['src', 'examples', 'test', 'docs'],
    extensions: ['js', 'md']
  },

  alias: {},

  entry: {
    test: 'test/node.js',
    size: 'test/size.js'
  }
};

module.exports = config;
