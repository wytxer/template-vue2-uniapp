module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  globals: {
    Vue: true,
    antd: true,
    uni: true,
    wx: true,
    getCurrentPages: true,
    getApp: true,
    requirePlugin: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    'no-trailing-spaces': 'warn',
    'import/newline-after-import': 'error',
    'vue/mustache-interpolation-spacing': 'warn',
    'vue/no-multi-spaces': 'warn',
    'vue/no-parsing-error': 'warn'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
