module.exports = {
  extends: [
    'ryansobol/es6',
    'ryansobol/mocha',
    'ryansobol/node'
  ],
  rules: {
      semi: ['error','never'],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }]
  }
};
