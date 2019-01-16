/* eslint-env mocha */

const helpers = require('./test-helpers')

const addModelTest = require('../lib/actions').addModelAction

describe('tymly add-model', () => {
  const tests = {
    'named-pizza': [
      'pizza',
      'Pizza',
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
    const pizzaName = inputs.shift()
    helpers.runTest(
      suiteName,
      name,
      inputs,
      addModelTest,
      pizzaName,
      { }
    )
  }
})
