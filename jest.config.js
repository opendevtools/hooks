module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-global',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
}
