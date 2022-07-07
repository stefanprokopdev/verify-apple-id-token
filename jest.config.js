module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  collectCoverageFrom: ["<rootDir>/src/lib/**/*.(t|j)s"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  modulePaths: ["<rootDir>/src/"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
