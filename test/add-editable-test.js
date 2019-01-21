/* eslint-env mocha */

const helpers = require('./test-helpers')

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
      '',
      'N',
      '',
      ''
    ],
    'set-file-name': [
      'Y',
      'the-pizza-form.json'
    ]
  }

  const suiteName = 'add-editable'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    helpers.runTest(
      suiteName,
      name,
      inputs,
      addEditable,
      { }
    )
  }
})
