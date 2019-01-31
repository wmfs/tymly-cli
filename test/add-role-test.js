/* eslint-env mocha */

const helpers = require('./test-helpers')

const addCategory = require('../lib/actions').addRole

describe('tymly add-role', () => {
  const tests = {
    'add-role': [
      'pizza',
      '',
      '',
      ''
    ],
    'fill-out-role': [
      'chef',
      'The Pizza Chef',
      'Someone who makes pizzas',
      ''
    ],
    'member-of-role': [
      'maestro',
      'The Pizza Maestro',
      'Someone who makes master pizzas',
      helpers.down + ' '
    ]
  }

  const suiteName = 'add-role'

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
