module.exports = {
    env: {
      node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  };
  