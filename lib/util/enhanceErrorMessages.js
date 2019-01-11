const program = require('commander')
const colour = require('./colour')

function enhanceErrorMessages (methodName, log) {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }
    this.outputHelp()
    console.log(colour.red(log(...args)))
    console.log()
  }
}

enhanceErrorMessages('missingArgument', argName => {
  return `\nMissing required argument ${colour.yellow(`<${argName}>`)}.`
})

enhanceErrorMessages('unknownOption', optionName => {
  return `\nUnknown option ${colour.yellow(optionName)}.`
})

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return `Missing required argument for option ${colour.yellow(option.flags)}` + (
    flag ? `, got ${colour.yellow(flag)}` : ``
  )
})

module.exports = enhanceErrorMessages
