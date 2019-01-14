const program = require('commander')
const c = require('ansi-colors')

function enhanceErrorMessages (methodName, log) {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }
    this.outputHelp()
    console.log(c.red(log(...args)))
    console.log()
  }
}

enhanceErrorMessages('missingArgument', argName => {
  return `\nMissing required argument ${c.yellow(`<${argName}>`)}.`
})

enhanceErrorMessages('unknownOption', optionName => {
  return `\nUnknown option ${c.yellow(optionName)}.`
})

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return `Missing required argument for option ${c.yellow(option.flags)}` + (
    flag ? `, got ${c.yellow(flag)}` : ``
  )
})

module.exports = enhanceErrorMessages
