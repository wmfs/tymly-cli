const program = require('commander')
const chalk = require('chalk')
const actions = require('./actions')

require('../lib/util/enhanceErrorMessages')

function tymlyCli (argv) {
  program
    .version(require('../package').version)
    .usage('<command> [options]')

  program
    .command('init [blueprint-name]')
    .description('create a new Tymly blueprint')
    .action((cmd, options) => {
      actions.init(cmd, options)
    })

  program
    .arguments('<command>')
    .action((cmd) => {
      program.outputHelp()
      console.log(`${chalk.red('Unknown command')} ${chalk.yellow(cmd)}.`)
      console.log()
    })

  program.on('--help', () => {
    console.log()
    console.log(`Run ${chalk.cyan(`tymly <command> --help`)} for detailed usage of given command.`)
    console.log()
  })

  program.parse(argv)

  if (!argv.slice(2).length) {
    program.outputHelp()
  }
} // tymlyCli

if (require.main === module) {
  tymlyCli(process.argv)
}

module.exports = tymlyCli
