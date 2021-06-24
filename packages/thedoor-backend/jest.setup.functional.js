// @todo use 'get-port' or similar to get any free port, enable running tests in parallel
const apiPort = 8123;

module.exports = {
  setupFilesAfterEnv: ['./test/setupFunctionalTests.ts'],
  automock: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    __PORT__: apiPort,
    __ENDPOINT__: `http://127.0.0.1:${apiPort}`
  },
  maxConcurrency: 1,
  testTimeout: 35000,
  testMatch: [
    "<rootDir>/test/**/?(*.)+(spec|test).[jt]s?(x)",
  ]
}
