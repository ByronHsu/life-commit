module.exports = {
   extends: ['eslint:recommended', 'prettier'],
   parserOptions: {
     ecmaVersion: 6,
     sourceType: 'module',
     ecmaFeatures: {
       experimentalObjectRestSpread: true
     }
   },
   env: {
     browser: true,
     node: true,
     es6: true
   },
   plugins: [
     'prettier'
   ],
   rules: {
     'prettier/prettier': [
       'error',
       {
         trailingComma: 'es5',
         singleQuote: true,
       },
     ],
     "global-require": 0,
     "import/no-extraneous-dependencies": 0,
     "no-console": 0,
     "no-underscore-dangle": 0,
     "indent": 0,
     "no-else-return": 0,
     "no-use-before-define": [2, "nofunc"],
     "valid-jsdoc": 0,
     "require-jsdoc": 0,
     "import/no-unresolved": 0,
   },
 };
 