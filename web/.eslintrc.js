module.exports = {
  extends: ["react-app", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  ignorePatterns: ["src/generated"],
  rules: {
    "prettier/prettier": "warn",
    "no-console": "warn",
  },
};
