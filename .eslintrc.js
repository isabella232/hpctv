// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    plugins: [
        'html'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'comma-dangle': [1,"never"],
        'no-dupe-args': 1,
        'no-dupe-keys': 2,
        'no-empty': 2,
        'space-before-function-paren':0,
        'semi': 0,
        'no-unreachable': 2,
        'valid-typeof': 1,
        'no-unexpected-multiline': 1,
        'dot-notation': 1,
        'no-multi-spaces': 1,
        'no-octal': 1,
        'no-redeclare': 1,
        'vars-on-top': 1,
        'no-unused-vars': 1,
        'no-mixed-spaces-and-tabs': [1,"smart-tabs"],
        'no-var': 1,
        'prefer-const': 1,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
