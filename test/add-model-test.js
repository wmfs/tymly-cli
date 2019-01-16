/* eslint-env mocha */

const helpers = require('./test-helpers')

const addModelTest = require('../lib/actions').addModelAction

describe('tymly add-model', () => {
  const tests = {
    'named-pizza': [
      'A pizza',
      'name',
      'string',
      'Y',
      'Y',
      '',
      'Y'
    ]
  }

  const suiteName = 'add-model'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    helpers.runTest(
      suiteName,
      name,
      inputs,
      addModelTest,
      { }
    )
  }
})
