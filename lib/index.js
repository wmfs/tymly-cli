const program = require('commander')
const c = require('ansi-colors')
const actions = require('./actions')

require('../lib/util/enhanceErrorMessages')

function tymlyCli (argv) {
  program
    .version(require('../package').version)
    .usage('<command> [options]')

  program
    .command('init')
    .description('Set up some details so you don\'t have to keep typing them')
    .option('--profile <path>', 'the directory to store the details in (defaults to your home directory)')
    .action((options) => {
      actions.initAction(options)
    })

  program
    .command('new-blueprint  <blueprint-name>')
    .description('Create a new Tymly blueprint')
    .option('-p, --path <path>', 'working directory - defaults to "."')
    .action((blueprintName, options) => {
      actions.newBlueprintAction(blueprintName, options)
    })

  program
    .arguments('<command>')
    .action((cmd) => {
      program.outputHelp()
      console.log(`${c.red('Unknown command')} ${c.yellow(cmd)}.`)
      console.log()
    })

  program.on('--help', () => {
    console.log()
    console.log(`Run ${c.cyan(`tymly <command> --help`)} for detailed usage of given command.`)
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
