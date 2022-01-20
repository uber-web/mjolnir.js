const {getESLintConfig, deepMerge} = require('ocular-dev-tools');

const defaultConfig = getESLintConfig({react: '16.8.2'});

module.exports = deepMerge(defaultConfig, {
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 2020
  },

  env: {
    es2020: true
    // browser: true,
    // node: true
  },

  rules: {
    camelcase: 0,
    indent: 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0
  }
});
