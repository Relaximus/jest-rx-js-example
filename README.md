# jest-rx-js-example [![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
 
 small project to illustrate how these two stack can work together
 
## How to run

```
npm run test
```

## Steps to build this kind of project
```
npm gts init
npm install -D jest
npm i @types/jest
```
helping jest to handle TS :)

```
jest --init
npm i -D babel-jest @babel/core @babel/preset-env
npm i -D @babel/preset-typescript
npm i -D ts-jest @types/jest
npx ts-jest config:init
```
create babel.config.js in the root of project.
```javascript
// babel.config.js
module.exports = {
  preset: 'ts-jest',
  rootDir: './src',
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testEnvironment: 'node',
};
```

for more sofisticated expectations checks let's use chai:

```cmd
npm i -D chai @types/chai
```