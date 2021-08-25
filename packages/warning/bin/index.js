#!/usr/bin/env node
const { Command } = require("commander")
const program = new Command()

program.version('0.0.1')
  .command('chart')
  .description('use chat robot of dingding | wechart | Lark | others, send diff results of assign files to chat group brefore git commit')
  .option('-webhooks, --webhooks <webhooks>', 'set webhooks api of dingding | wechart | Lark | others, separated by commas')
  .option('-monitor-files, --monitor-files <monitorFiles>', 'set monitor files')
  .action(require('../src/run')('chart'))

program.command('email')
  .description('send diff results of assign files to some emails')
  .option('-email-sender, ---email-sender <emailSender>', 'set the email sender')
  .option('-email-sender-pass, --email-sender-pass <emailSenderPass>', 'set the email sender pass, you should open lMAP/SMTP or POP3/SMTP of email')
  .option('-email-receivers, --email-receivers <emailReceivers>', 'set the email receivers, separated by commas')
  .option('-monitor-files, --monitor-files <monitorFiles>', 'set monitor files')
  .action(require('../src/run')('email'))

program.parse(process.argv)
