module.exports = {
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  collectCoverageFrom: ['index.js'],
  coveragePathIgnorePatterns: ['test/test.utils.js'],
};
