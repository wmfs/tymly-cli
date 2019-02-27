/* eslint-env mocha */

const helpers = require('./test-helpers')

const addStateMachine = require('../lib/actions').addStateMachine

describe('tymly add-state-machine', () => {
  const tests = {
    'create with reindex': [
      '',
      '', // default title
      '', // default description
      '', // default role
      'Y', // reindex
      ''
    ],
    'create no reindex': [
      '',
      '', // default title
      '', // default description
      '', // default role
      'N', // reindex
      ''
    ],
    'update with reindex': [
      helpers.down,
      '', // default title
      '', // default description
      '', // default role
      'Y',
      ''
    ],
    'update no reindex': [
      helpers.down,
      '', // default title
      '', // default description
      '', // default role
      'N',
      ''
    ],
    'two-forms-no-meta': [
      helpers.down + helpers.down, // state machine
      helpers.down, // choose form
      helpers.down, // choose model
      '', // default title
      '', // default description
      '', // default role
      ''
    ],
    'set-file-name': [
      helpers.down,
      '', // default title
      'Pizza for everyone!',
      ' ', // $everyone role
      'N',
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
