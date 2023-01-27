/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  modulePathIgnorePatterns: ["dist"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["./test/setup-prisma.ts"],
  testEnvironment: "@quramy/jest-prisma/environment",
};
