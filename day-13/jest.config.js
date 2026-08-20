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
  // Automatically solves modern TypeScript ESM extension mismatches natively
  resolver: "jest-ts-webcompat-resolver"
};
