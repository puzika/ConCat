export default {
  testEnvironment: 'jest-fixed-jsdom',
  transformIgnorePatterns: [
    "node_modules/(?!.pnpm|until-async/)"
  ],
};