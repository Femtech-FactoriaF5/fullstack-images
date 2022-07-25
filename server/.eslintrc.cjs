/* eslint-disable no-undef */
module.exports = {
    'plugins': ['jest'],
    'env': {
        'browser': true,
        'es2021': true,
        'jest/globals': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
