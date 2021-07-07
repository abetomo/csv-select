module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {},
}
