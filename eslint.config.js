// {
//     "root": true,
//     "parser": "@typescript-eslint/parser",
//     "plugins": [
//       "@typescript-eslint"
//     ],
//     "extends": [
//       "eslint:recommended",
//       "plugin:@typescript-eslint/recommended",
//       "prettier"
//     ],
//     "parserOptions":  {
//       "ecmaVersion":  2020,  // Allows for the parsing of modern ECMAScript features
//       "sourceType":  "module"  // Allows for the use of imports
//     },
//     "rules": {
//       "semi": [2, "always"],
//       "space-before-function-paren": [0, {"anonymous": "always", "named": "always"}],
//       "camelcase": 0,
//       "no-return-assign": 0,
//       "quotes": ["error", "single"],
//       "@typescript-eslint/no-non-null-assertion": "off",
//       "@typescript-eslint/no-namespace": "off",
//       "@typescript-eslint/explicit-module-boundary-types": "off"
//     }
//   }


import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
  },
  // Integrate Prettier rules
  eslintConfigPrettier
];
