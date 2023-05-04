// eslint-disable-next-line @typescript-eslint/no-var-requires
const anymatch = require('anymatch')

console.info(anymatch(['./packages/warning/*.js'], 'packages/warning/a.js'))
