// eslint-disable-next-line no-undef
module.exports = {
  "globals": {
    "process": true,
  },
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "semi": ["error", "always"],
    "quotes" : ["error", "double"],
    "indent": ["error", 2],
  }
};
