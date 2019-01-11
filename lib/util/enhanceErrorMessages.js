const program = require('commander')
const chalk = require('chalk')

function enhanceErrorMessages (methodName, log) {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }
    this.outputHelp()
    console.log(chalk.red(log(...args)))
    console.log()
  }
}

enhanceErrorMessages('missingArgument', argName => {
  return `\nMissing required argument ${chalk.yellow(`<${argName}>`)}.`
})

enhanceErrorMessages('unknownOption', optionName => {
  return `\nUnknown option ${chalk.yellow(optionName)}.`
})

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
    flag ? `, got ${chalk.yellow(flag)}` : ``
  )
})

module.exports = enhanceErrorMessages
