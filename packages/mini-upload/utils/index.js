#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const program = require('commander')
const pkg = require('../package.json')

function check(action, regex) {
  return function (v, vv) {
    if (regex) {
      if (regex.test(v)) {
        return v
      }
      console.error(
        `Fail to map (${regex}). Check the options by "antm-mini-upload ${action} --help"`,
      )
      process.exit(1)
    } else {
      if (!v) {
        return vv
      }

      return v
    }
  }
}

async function weapp(program) {
  const doWeapp = require('./weapp')
  await doWeapp(
    program.appid,
    program.privateKeyPath,
    program.type,
    program.desc,
    program.robotId,
    program.deployVersion,
  )
}

async function alipay(program) {
  const doAlipay = require('./alipay')
  doAlipay(
    program.appid,
    program.privateKey,
    program.type,
    program.toolId,
    program.deployVersion,
  )
}

async function tt(program) {
  const doTt = require('./tt')
  await doTt(
    program.email,
    program.password,
    program.type,
    program.deployVersion,
  )
}

program.version(pkg.version, '-v, --version')

program
  .command('weapp')
  .description('CI weapp miniprogram.')
  .usage('[command] <options ...>')
  .option(
    '-t, --type <type>',
    'Choose a type. [eg: /^(preview)|(upload)$/]',
    check('weapp', /^(preview)|(upload)$/),
    'preview',
  )
  .option(
    '-rid, --robotId <robotId>',
    'Choose a robotId. [eg: /^([1-9])|([1-2][0-9])|30$/]',
    check('weapp', /^([1-9])|([1-2][0-9])|30$/),
    '1',
  )
  .requiredOption('-aid, --appid <appid>', 'appId')
  .requiredOption('-pkp, --privateKeyPath <pkp>', 'pkp')
  .requiredOption('-d, --desc <desc>', 'desc')
  .requiredOption('-dv, --deployVersion <deployVersion>', 'deployVersion')
  .action(weapp)
  .on('--help', () => {
    console.info('\n  Example:')
    console.info(
      '\n  $ antm-mini-upload weapp --type [preview|upload] --appid [appid] --privateKeyPath [./xxx.key] --desc [preview] --robotId [1] --deployVersion [1.0.0]',
    )
  })

program
  .command('alipay')
  .description('CI alipay miniprogram.')
  .usage('[command] <options ...>')
  .option(
    '-t, --type <type>',
    'Choose a type. [eg: /^(preview)|(upload)$/]',
    check('alipay', /^(preview)|(upload)$/),
    'preview',
  )
  .requiredOption('-i, --appid <appid>', 'appId')
  .requiredOption('-pk, --privateKey <pk>', 'pk')
  .requiredOption('-tid, --toolId <toolId>', 'toolId')
  .requiredOption('-dv, --deployVersion <deployVersion>', 'deployVersion')
  .action(alipay)
  .on('--help', () => {
    console.info('\n  Example:')
    console.info(
      '\n  $ antm-mini-upload alipay --type [preview|upload] --appid [appid] --privateKey [xxxx] --toolId [xxx] --deployVersion [1.0.0]',
    )
  })

program
  .command('tt')
  .description('CI tt miniprogram.')
  .usage('[command] <options ...>')
  .option(
    '-t, --type <type>',
    'Choose a type. [eg: /^(preview)|(upload)$/]',
    check('tt', /^(preview)|(upload)$/),
    'preview',
  )
  .requiredOption('-e, --email <email>', 'email')
  .requiredOption('-p, --password <password>', 'password')
  .requiredOption('-dv, --deployVersion <deployVersion>', 'deployVersion')
  .action(tt)
  .on('--help', () => {
    console.info('\n  Example:')
    console.info(
      '\n  $ antm-mini-upload tt --type [preview|upload] --email [email] --password [password] --deployVersion [1.0.0]',
    )
  })

program.parse(process.argv)
