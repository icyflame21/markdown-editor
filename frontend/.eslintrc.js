module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "react-app"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'error',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-undef': 0,
    'no-unused-vars': 0,
    'prettier/prettier': 0,
    "react/prop-types": "off", 
    'no-dupe-else-if': 0,
  },
  globals: {
    process: true
  }
};
