/* eslint-env mocha */

const helpers = require('./test-helpers')

const addStateMachine = require('../lib/actions').addStateMachine

describe('tymly add-state-machine', () => {
  const tests = {
    'update': [
      helpers.down,
      ''
    ],
    'two-forms-no-meta': [
      helpers.down + helpers.down, // state machine
      helpers.down, // choose form
      helpers.down, // choose model
      ''
    ],
    'set-file-name': [
      helpers.down,
      'futz-around-with-pizza'
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
