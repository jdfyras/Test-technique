module.exports = {
    displayName: 'unit',

    roots: ['<rootDir>'],
    clearMocks: true,
    moduleFileExtensions: ['js5', 'js', 'mjs', 'cjs', 'ts'],
    reporters: ['default'],
    setupFilesAfterEnv: ['jest-extended/all'],
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|ts)$',
    verbose: true
}
