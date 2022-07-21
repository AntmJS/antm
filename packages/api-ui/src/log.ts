import chalk from 'chalk'

const log = console.log

export default {
  success: (mess: string) => log(chalk.green(mess)),
  error: (mess: string) => log(chalk.red(mess)),
  warning: (mess: string) => log(chalk.yellow(mess)),
  tips: (mess: string) => log(chalk.blue(mess)),
}
