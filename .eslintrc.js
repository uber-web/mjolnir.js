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
  },

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
      rules: {
        indent: 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unsafe-call': 0
      }
    }
  ]
});
