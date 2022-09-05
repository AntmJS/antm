#!/usr/bin/env node
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Command } from 'commander'
import watch from './watch.js'
import build from './build.js'
import file from './file.js'
import swagger from './swagger/index.js'

const program = new Command()

program
  .command('watch')
  .description(
    'in watch mode, build api-ui from request types and run mock server',
  )
  .option('-p, --path <path>', 'request types path')
  .option('-s, --server <server>', 'if start api-ui server')
  .option('-m, --mock <mock>', 'if start mock server')
  .option('-a, --action <action>', 'if create requst actions')
  .action(watch)

program
  .command('build')
  .description('in production mode, build api-ui from request types')
  .option('-p, --path <path>', 'request types path')
  .action(build)

program
  .command('file')
  .description('glob request types')
  .option('-p, --path <path>', 'request types path')
  .option('-w, --watch <watch>', 'watch files change')
  .option('-ac, --action <action>', 'if create request methods')
  .action(file)

program
  .command('swagger')
  .description('create request types and actions from  swagger data')
  .option('-p, --path <path>', 'request types path')
  .option('-u, --url <url>', 'the url of swagger data')
  .option('-mod, --modules <modules>', 'swagger tag item split with comma')
  .option('-a, --actions <actions>', 'if create request method')
  .action(swagger)

program.parse(process.argv)
