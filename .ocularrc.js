const {resolve} = require('path');

const config = {
  lint: {
    paths: ['src', 'examples', 'test', 'docs']
  },

  alias: {
    'mjolnir.js': resolve('./src')
  },

  entry: {
    test: 'test/node.js',
    size: 'test/size.js'
  }
};

module.exports = config;
