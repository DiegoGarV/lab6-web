module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2021
  },
  rules: {

    // LINEAMIENTOS DE AIRBNB PARA EVALUACIÓN DE CÓDIGO ---------------------------------------
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'space-before-function-paren': ['error', 'always'],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none' }],
    'prefer-const': ['error', { 'destructuring': 'all' }],
    'arrow-parens': ['error', 'always'],
    'no-var': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
    'linebreak-style': ['error', 'unix'],

    // REGLA CUSTOM PARA PROHIBIR EL PUNTO Y COMA ---------------------------------------------
    'semi': ['error', 'never']
  },
}