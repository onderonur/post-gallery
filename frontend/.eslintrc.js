module.exports = {
  extends: ["react-app", "plugin:prettier/recommended"],
  plugins: ["graphql", "prettier"],
  rules: {
    "prettier/prettier": "warn",
    "no-console": "warn",
    "prefer-const": "warn",
    "object-shorthand": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "graphql/template-strings": [
      // TODO: Will open this later
      "off",
      {
        env: "apollo",
        schemaJson: require("./graphql.schema.json"),
      },
    ],
  },
};
