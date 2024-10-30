module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import-x/errors",
    "plugin:import-x/warnings",
    "plugin:import-x/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    projectService: {
      allowDefaultProject: [".eslintrc.js"],
      defaultProject: "tsconfig.json",
    },
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import-x", "prettier"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    quotes: ["error", "double"],
    "import-x/no-unresolved": 0,
    indent: ["error", 2],
    "object-curly-spacing": ["error", "always"],
    "prettier/prettier": ["error"],
  },
};
