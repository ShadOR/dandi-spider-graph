module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-uses-react": "off",
    "react/function-component-definition": [2, {
      "namedComponents": ["function-declaration", "function-expression", "arrow-function"],
      "unnamedComponents": ["function-expression", "arrow-function"]
    }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
};
