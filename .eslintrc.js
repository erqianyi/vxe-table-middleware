module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    // parser: '@babel/eslint-parser',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { parser: 'flow' }],
    'no-prototype-builtins': 0,
  },
};
