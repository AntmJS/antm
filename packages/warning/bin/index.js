#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const { Command } = require('commander')
const program = new Command()

program
  .version('0.0.1')
  .command('webhooks')
  .description(
    'use chat robot of dingding | wechart | Lark | others, send diff results of assign files to chat group brefore git commit',
  )
  .option(
    '-u, --url <url>',
    'set webhooks api of dingding | wechart | Lark | others, separated by commas',
  )
  .option('-mf, --monitor-files <monitorFiles>', 'set monitor files')
  .action(require('../src/run')('webhooks'))

program
  .command('email')
  .description('send diff results of assign files to some emails')
  .option('-sender, --sender <sender>', 'set the email sender')
  .option(
    '-sender-pass, --sender-pass <senderPass>',
    'set the email sender pass, you should open lMAP/SMTP or POP3/SMTP of email',
  )
  .option(
    '-receivers, --receivers receivers>',
    'set the email receivers, separated by commas',
  )
  .option('-mf, --monitor-files <monitorFiles>', 'set monitor files')
  .action(require('../src/run')('email'))

program.parse(process.argv)
