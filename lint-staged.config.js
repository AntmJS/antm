module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['npx eslint -c eslint.config.js --fix'],
  '**/*.ts?(x)': () => 'npx tsc -p tsconfig.json --skipLibCheck',
  '**/*.{css,less}': ['npx stylelint --aei --config stylelint.config.js --fix'],
}
