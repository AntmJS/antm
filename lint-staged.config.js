module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['npx eslint -c eslint.config.js --fix'],
  '**/*.ts?(x)': () => 'npx tsc -p tsconfig.eslint.json',
  '**/*.{css,less}': ['npx stylelint --config stylelint.config.js --fix'],
}