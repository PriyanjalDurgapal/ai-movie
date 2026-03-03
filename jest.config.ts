import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // Fix for @/ alias
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  testMatch: ["**/__tests__/**/*.(ts|tsx)"],
};

export default config;