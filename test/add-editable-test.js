/* eslint-env mocha */

const helpers = require('./test-helpers')
const path = require('path')

const addEditable = require('../lib/actions').addEditableAction

describe('tymly add-editable', () => {
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
    ],
    'path-to-external-model': {
      user: [
        'Y',
        ''
      ],
      options: {
        'modelPath': path.join(__dirname, 'fixtures/additional-blueprint/models/drinks.json')
      }
    }
  }

  const suiteName = 'add-editable'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    let userInput = inputs
    let options = { }
    if (!Array.isArray(inputs)) {
      userInput = inputs.user
      options = inputs.options
    }

    helpers.runTest(
      suiteName,
      name,
      userInput,
      addEditable,
      options
    )
  }
})
