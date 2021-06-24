module.exports = {
  automock: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)",
  ]
}
