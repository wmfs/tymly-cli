/* eslint-env mocha */

const helpers = require('./test-helpers')

const addSearchDoc = require('../lib/actions').addSearchDoc

describe('tymly add-search-doc', () => {
  const tests = {
    'add-search': [
      helpers.down, // label -> choose label
      helpers.down + ' ', // description -> select label
      '', // addition fields -> select none of them
      helpers.down, // sortBy -> choose label
      'View', // state machine preselected, so this is the launches label
    ]
    // two models,
    // multiple everything
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
