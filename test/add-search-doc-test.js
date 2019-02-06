/* eslint-env mocha */

const helpers = require('./test-helpers')

const addSearchDoc = require('../lib/actions').addSearchDoc

describe('tymly add-search-doc', () => {
  const tests = {
    'one-model': [
      helpers.down, // label -> choose label
      helpers.down + ' ', // description -> select label
      // '', // addition fields -> select none of them
      'pizza', // categories - manual entry
      '', // roles - manual entry, accept default
      '', // launches preselected
      '' // accept default filename
    ],
    'two-models': [
      helpers.down, // model -> choose pizza
      helpers.down, // label -> choose label
      helpers.down + ' ', // description -> select label
      // '', // addition fields -> select none of them
      // '', // one category, autoselected
      '', // roles - manual entry, accept default
      'y', // state machine preselected, confirm
      '' // accept default filename
    ],
    'multiple-everything': [
      helpers.down, // model -> choose pizza
      helpers.down, // label -> choose label
      ' ' + helpers.down + ' ', // description -> code and label
      // '', // addition fields -> select none of them
      helpers.down, // categories - select pizza
      helpers.down + helpers.down + ' ' + helpers.down + ' ', // roles - select chef and customer
      'View',
      helpers.down, // select view state machine
      '',
      'yes-boys' // accept default filename
    ]

  }

  const suiteName = 'add-search-doc'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    helpers.runTest(
      suiteName,
      name,
      inputs,
      addSearchDoc,
      { }
    )
  }
})
