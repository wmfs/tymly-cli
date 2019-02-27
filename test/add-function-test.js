/* eslint-env mocha */

const helpers = require('./test-helpers')

const addFunction = require('../lib/actions').addFunction

describe('tymly add-function', () => {
  const tests = {
    'add-function': [
      'performSomeAction'
    ]
  }

  const suiteName = 'add-function'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    helpers.runTest(
      suiteName,
      name,
      inputs,
      addFunction,
      { }
    )
  }
})
