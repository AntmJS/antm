module.exports = {
  extends: './packages/eslint/index.js',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: '2021',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: 'tsconfig.json',
      },
    },
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
      // flowVersion: '0.53', // Flow version
    },
  },
}
