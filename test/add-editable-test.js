/* eslint-env mocha */

const path = require('path')

const helpers = require('./test-helpers')

const addEditable = require('../lib/actions').addEditableAction

describe('tymly add-editable', () => {
  const tests = {
    'one-model': [
      '', // generated form title
      '', // generated form description
      '', // category
      'Y',
      ''
    ],
    'two-models': [
      helpers.down,
      '', // generated form title
      '', // generated form description
      '', // category
      'Y',
      ''
    ],
    'two-models-choose-fields': [
      helpers.down,
      'Simple Pizza!', // alternative title
      'For your raaaaapid pizza data entry needs', // alternative description
      '', // category
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
      '', // generated form title
      '', // generated form description
      '', // category
      'Y',
      'the-pizza-form.json'
    ],
    'path-to-external-model': {
      user: [
        '', // generated form title
        '', // generated form description
        '', // category
        'Y',
        ''
      ],
      options: {
        'modelPath': path.join(__dirname, 'fixtures/additional-blueprint/models/drinks.json')
      }
    },
    'uses-additional-blueprint': [
      helpers.down + helpers.down,
      '', // generated form title
      '', // generated form description
      '', // category
      'Y',
      ''
    ],
    'bad-path-to-external-model': {
      user: [
      ],
      options: {
        'modelPath': path.join(__dirname, 'fixtures/additional-blueprint/models/paddling-pool.json')
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
