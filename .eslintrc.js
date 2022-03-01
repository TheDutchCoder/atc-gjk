module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  parserOptions: {
    ecmaVersion: 13,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  ignorePatterns: [
    '**/*.mdx',
    '**/*.css',
  ],
  rules: {
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single', {
        'allowTemplateLiterals': true,
      },
    ],
    'semi': [
      'error',
      'never',
    ],
    'space-before-function-paren': [
      'error',
      'always',
    ],
    'keyword-spacing': [
      'error',
    ],
    'space-before-blocks': [
      'error',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'eol-last': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never',
      },
    ],
  },
}
