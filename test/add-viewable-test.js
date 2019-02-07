/* eslint-env mocha */

const helpers = require('./test-helpers')

const addViewable = require('../lib/actions').addViewableAction

const suiteName = 'add-viewable'

describe(`tymly ${suiteName}`, () => {
  const tests = {
    'one-model': [
      'Y',
      ''
    ],
    'two-models': [
      helpers.down,
      'Y',
      ''
    ],
    'two-models-choose-fields': [
      helpers.down,
      'N',
      '',
      '', // generated title
      '',
      '', // use title from model
      'N',
      '',
      'Is it vegetarian?', // provide title
      '' // take selected filename
    ],
    'set-file-name': [
      'Y',
      'the-pizza-form.json'
    ]
  }

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    let userInput = inputs

    helpers.runTest(
      suiteName,
      name,
      userInput,
      addViewable,
      { }
    )
  }
})
