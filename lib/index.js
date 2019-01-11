const program = require('commander')

function tymlyCli (argv) {
  program
    .version(require('../package').version)
    .usage('<command> [options]')

  program.parse(argv)

  if (!argv.slice(2).length) {
    program.outputHelp()
  }
} // tymlyCli

if (require.main === module) {
  tymlyCli(process.argv)
}

module.exports = tymlyCli
