const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
