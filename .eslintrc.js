module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // 'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-tabs': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // tsx 'h'
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 3
      },
      "multiline": {
        "max": 1
      }
    }],
    "vue/multi-word-component-names": ["error", {
      "ignores": ["index"]
    }],
    "vue/html-closing-bracket-newline": ["error", {
      "multiline": "never"
    }],
    "no-undef": "off"
  },
  globals: {
    cloneDeep: true
    // moment: true
  }
}
