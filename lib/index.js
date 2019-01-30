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
    .command('new-blueprint <blueprint-name>')
    .description('Create a new Tymly blueprint')
    .option('-p, --path <path>', 'working directory - defaults to "."')
    .option('--profile <path>', 'alternative profile path - defaults to your home directory')
    .action((blueprintName, options) => {
      actions.newBlueprintAction(blueprintName, options)
    })

  program
    .command('add-model <model-name>')
    .description('Add a new Tymly data model to a blueprint')
    .option('-p, --path <path>', 'blueprint directory - defaults to "."')
    .action((modelName, options) => {
      actions.addModelAction(modelName, options)
    })

  program
    .command('add-editable')
    .description('Scaffold a new form')
    .option('-p, --path <path>', 'blueprint directory - defaults to "."')
    .option('-m, --model-path <path>', 'path to the model file, useful if you want to add a form for a model that is defined in another blueprint')
    .action((options) => {
      actions.addEditableAction(options)
    })

  program
    .command('add-state-machine')
    .description('Generate a new state machine')
    .option('-p, --path <path>', 'blueprint directory - defaults to "."')
    .action((options) => {
      actions.addStateMachine(options)
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
