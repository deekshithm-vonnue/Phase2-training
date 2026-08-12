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
    "^(\\.\\.?/.*)\\.ts$": "$1",
    "^(\\.\\.?/.*)\\.js$": "$1"
  }
};
