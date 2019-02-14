const { prompt } = require('enquirer')

async function ask (question) {
  if (!question.type) {
    question.type = 'input'
  }
  if (!question.name) {
    question.name = 'name'
  }
  if (question.multiple && !question.hint) {
    question.hint = '(Use <space> to select, <return> to submit)'
  }
  const selection = await prompt(question)
  return selection[question.name]
} // ask

module.exports = ask
