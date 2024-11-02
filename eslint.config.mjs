import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import jest from 'eslint-plugin-jest';
import _import from 'eslint-plugin-import';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/*.d.ts',
      '**/.eslintrc.js',
      '**/node_modules',
      '**/dist',
      '**/coverage',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:import/errors',
      'plugin:import/warnings',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      jest,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
      },
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-var-requires': ['off'],
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/no-floating-promises': ['error'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'import/no-default-export': ['error'],
      'max-params': ['error', 3],
      complexity: ['error', 6],
      'no-console': ['error'],
      'no-unused-vars': 2,
    },
  },
];
