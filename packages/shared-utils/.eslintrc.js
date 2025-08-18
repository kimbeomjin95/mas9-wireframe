module.exports = {
  extends: ["../../.eslintrc.js"],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
};