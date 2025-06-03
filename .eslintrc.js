/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/no-namespace": "off",
    "no-prototype-builtins": "off",
    "no-inner-declarations": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off"
  },
  root: true,
};