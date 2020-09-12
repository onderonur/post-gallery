module.exports = {
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['graphql', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'no-console': 'warn',
    'no-alert': 'warn',
    'no-else-return': 'warn',
    'prefer-const': 'warn',
    'object-shorthand': 'warn',
    'no-var': 'warn',
    'no-duplicate-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    curly: 'warn',
    'graphql/template-strings': [
      'off',
      {
        env: 'apollo',
        schemaJson: require('./graphql.schema.json'),
      },
    ],
  },
};
