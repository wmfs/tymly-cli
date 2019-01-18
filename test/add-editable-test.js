/* eslint-env mocha */

const helpers = require('./test-helpers')

const addEditable = require('../lib/actions').addEditableAction

describe('tymly add-editable', () => {
  const tests = {
    'one-model': [
    ],
    'two-models': [
      helpers.down
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
