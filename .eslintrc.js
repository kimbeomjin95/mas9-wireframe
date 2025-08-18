module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-console": "warn",
  },
  ignorePatterns: [
    "dist/",
    "node_modules/",
    ".turbo/",
    "coverage/",
    "*.config.js",
    "*.config.ts",
  ],
};