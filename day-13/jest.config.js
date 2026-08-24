import { createDefaultEsmPreset } from "ts-jest";

const tsJestPreset = createDefaultEsmPreset();

/** @type {import("jest").Config} **/
export default {
  ...tsJestPreset,
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  
  // 1. EXTEND THE TRANSFORM REGEX TO COVER YOUR EXTERNAL GENERATED FOLDER
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true, // Forces ts-jest to output modern ESM instead of CJS
      },
    ],
  },

  // 2. TELL JEST EXPLICITLY NOT TO IGNORE THE GENERATED WORKSPACE OR PRISMA
  transformIgnorePatterns: [
    "node_modules/(?!@prisma/|@prisma-client/)",
    // Ensures everything containing "generated" undergoes compilation
    "/(?<!generated)/node_modules/", 
  ],

  // Automatically solves modern TypeScript ESM extension mismatches natively
  resolver: "jest-ts-webcompat-resolver"
};
