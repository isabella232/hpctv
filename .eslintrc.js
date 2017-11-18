// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    "comma-dangle": [1,"never"],
    "no-dupe-args": 1,
    "no-dupe-keys": 2,
    "no-empty": 2,
    "no-extra-parens": [1,"all"],
    "space-before-function-paren":0,
    "semi": 0,
    "no-unreachable": 2,
    "valid-typeof": 1,
    "no-unexpected-multiline": 1,
    "dot-notation": 1,
    "no-multi-spaces": 1,
    "no-octal": 1,
    "no-redeclare": 1,
    "vars-on-top": 1,
    "no-unused-vars": 1,
    "no-mixed-spaces-and-tabs": [1,"smart-tabs"],
    "no-var": 1,
    "prefer-const": 1,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
