#!/usr/bin/env node
import { Command } from 'commander'
import pkg from '../package.json'
import run from './run'

const program = new Command()

;(async function () {
  program
    .version(pkg.version)
    .command('webhooks')
    .description(
      'use chat robot of dingding | wechart | Lark | others, send diff results of assign files to chat group brefore git commit',
    )
    .option(
      '-u, --url <url>',
      'set webhooks api of dingding | wechart | Lark | others, separated by commas',
    )
    .option('-mf, --monitor-files <monitorFiles>', 'set monitor files')
    .action(await run('webhooks'))

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
    .action(await run('email'))

  program.parse(process.argv)
})()
