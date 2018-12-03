module.exports = {
  "extends": "airbnb-base",
  "env": {
    "node": true,
    "mocha": true,
  },
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {"devDependencies": ["**/test/**/*.js"]},
    ],
    "camelcase": "off",
    "no-unused-expressions": "off",
    "consistent-return": "off",
    "no-underscore-dangle": "off",
  },
};