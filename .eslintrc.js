module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: `./tsconfig.json`,
  },
  plugins: ['@typescript-eslint', 'sonarjs', 'jest', 'import'],
  globals: {
    Api: 'readonly',
  },
  extends: [
    'eslint:recommended', // Uses the recommended rules from @eslint-plugin-react
    'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:sonarjs/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  ignorePatterns: ['**/*.d.ts', '.eslintrc.js'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'import/no-default-export': ['error'],
    'max-params': ['error', 3],
    complexity: ['error', 6],
    'no-console': ['error'],
    'no-unused-vars': 2,
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/prefer-immediate-return': 'off',
    'sonarjs/no-identical-functions': 'off', // enable when fixed
    'sonarjs/cognitive-complexity': ['error', 10],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  env: {
    node: true,
    es2020: true,
    jest: true,
  },
};
