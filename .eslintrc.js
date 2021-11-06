module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 'off',
        'indent': ["error", 4],
        'eol-last': 0,
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'space-before-function-paren': ['error', 'never'],
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
}