import { createDefaultEsmPreset } from "ts-jest";

const tsJestPreset = createDefaultEsmPreset();

/** @type {import("jest").Config} **/
export default {
  ...tsJestPreset,
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    ...tsJestPreset.transform,
  },
  moduleNameMapper: {
    "^\\.\\./js/(.*)\\.js$": "../js/$1.ts",
    "^\\./js/(.*)\\.js$": "./js/$1.ts"
  }
};
