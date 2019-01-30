/* eslint-env mocha */

const helpers = require('./test-helpers')

const addStateMachine = require('../lib/actions').addStateMachine

describe('tymly add-state-machine', () => {
  const tests = {
    'update': [
      '',
      '',
      ''
    ]
  }

  const suiteName = 'add-state-machine'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    helpers.runTest(
      suiteName,
      name,
      inputs,
      addStateMachine,
      { }
    )
  }
})
