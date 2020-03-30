module.exports = {
  preset: 'ts-jest',
  rootDir: './src',
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testEnvironment: 'node',
};