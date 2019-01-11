const program = require('commander')
const colour = require('../lib/util/colour')
const actions = require('./actions')

require('../lib/util/enhanceErrorMessages')

function tymlyCli (argv) {
  program
    .version(require('../package').version)
    .usage('<command> [options]')

  program
    .command('init  <blueprint-name> [options]')
    .description('create a new Tymly blueprint')
    .option('-p, --path <path>', 'working directory - defaults to "."')
    .action((blueprintName, _, options) => {
      actions.init(blueprintName, options)
    })

  program
    .arguments('<command>')
    .action((cmd) => {
      program.outputHelp()
      console.log(`${colour.red('Unknown command')} ${colour.yellow(cmd)}.`)
      console.log()
    })

  program.on('--help', () => {
    console.log()
    console.log(`Run ${colour.cyan(`tymly <command> --help`)} for detailed usage of given command.`)
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
