module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: ['standard', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'prettier/prettier': 'off',
        'spaced-comment': 'off',
        'no-console': 'off',
        'consistent-return': 'off',
        'func-names': 'off',
        'object-shorthand': 'off',
        'no-process-exit': 'off',
        'no-param-reassign': 'off',
        'no-return-await': 'off',
        'no-underscore-dangle': 'off',
        'class-methods-use-this': 'off',
        // 'prefer-destructuring': ['error', { object: true, array: false }],
        'no-use-before-define': [
            'error',
            {
                functions: true,
                classes: true,
                variables: true
                // allowNamedExports: false
            }
        ],
        'prefer-const': 'off',
        'no-unused-vars': ['error'],
        semi: 'off'
    }
}
