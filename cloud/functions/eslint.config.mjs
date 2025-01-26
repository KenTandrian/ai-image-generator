import pluginJs from "@eslint/js";
import google from "eslint-config-google";
import * as importPlugin from "eslint-plugin-import";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

// Temporary workaround for jsdoc rules
delete google.rules["require-jsdoc"];
delete google.rules["valid-jsdoc"];

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  importPlugin.flatConfigs?.errors,
  importPlugin.flatConfigs?.warnings,
  importPlugin.flatConfigs?.typescript,
  google,
  ...tseslint.configs.recommended,
  pluginPrettier,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      quotes: ["error", "double"],
      "import/no-unresolved": 0,
      indent: ["error", 2],
      "object-curly-spacing": ["error", "always"],
      "prettier/prettier": ["error"],
    },
  },
  {
    ignores: ["lib/**/*", "node_modules/"],
  },
];
