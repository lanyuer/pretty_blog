/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.tsx?$': ['esbuild-jest', { sourcemap: true }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^gray-matter$': '<rootDir>/__mocks__/gray-matter.ts',
    '^remark$': '<rootDir>/__mocks__/remark.ts',
    '^remark-html$': '<rootDir>/__mocks__/remark-html.ts',
  },
};

module.exports = customJestConfig;
