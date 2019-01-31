/* eslint-env mocha */

const helpers = require('./test-helpers')

const addCategory = require('../lib/actions').addCategory

describe('tymly add-category', () => {
  const tests = {
    'add-category': [
      'pizza',
      '',
      ''
    ],
    'fill-out-category': [
      'pizza',
      'Yummy Pizza',
      'Everything pizzas'
    ]
  }

  const suiteName = 'add-category'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    helpers.runTest(
      suiteName,
      name,
      inputs,
      addCategory,
      { }
    )
  }
})
