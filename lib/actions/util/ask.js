const { prompt } = require('enquirer')

async function ask (question) {
  const None = '--NONE--'

  if (!question.type) {
    question.type = 'input'
  }
  if (!question.name) {
    question.name = 'name'
  }
  if (question.multiple && !question.hint) {
    question.hint = '(Use <space> to select, <return> to submit)'
  }
  if (question.type === 'autocomplete' && question.allowNone) {
    question.choices = [
      {
        name: 'None',
        hint: `(select to exit)`,
        value: None
      },
      ...question.choices
    ]
  }

  const selection = (await prompt(question))[question.name]
  return (selection !== None) ? selection : null
} // ask

module.exports = ask
