module.exports = {
  testPathIgnorePatterns: ['/node_modules/', 'dist'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-global',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
}
