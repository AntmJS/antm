#!/usr/bin/env node

if (!process.argv[2]) {
  console.info('lost DingDing access_token')

  process.exit(1)
}
require('../src/run')(process.argv[2])