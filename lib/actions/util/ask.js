const { prompt } = require('enquirer')

async function ask (question) {
  if (!question.type) {
    question.type = 'input'
  }
  if (!question.name) {
    question.name = 'name'
  }
  const selection = await prompt(question)
  return selection[question.name]
} // ask

module.exports = ask
