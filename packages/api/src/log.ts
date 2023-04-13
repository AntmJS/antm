import chalk from 'chalk'

export default {
  success: (mess: string) => chalk.green(mess),
  error: (mess: string) => chalk.red(mess),
  warning: (mess: string) => chalk.yellow(mess),
  tips: (mess: string) => chalk.grey(mess),
}
