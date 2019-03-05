/* eslint-env mocha */

const path = require('path')

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
      helpers.down + helpers.down, // select view state machine
      'View',
      '',
      'yes-boys' // accept default filename
    ],
    'path-to-external-model': {
      user: [
        helpers.down, // label
        ' ' + helpers.down + ' ', // description
        // '', // addition fields -> select none of them
        // '', // one category, autoselected
        '', // roles - manual entry, accept default
        'y', // state machine preselected, confirm
        ''
      ],
      options: {
        'modelPath': path.join(__dirname, 'fixtures/additional-blueprint/models/drinks.json')
      }
    }
  }

  const suiteName = 'add-search-doc'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    let userInput = inputs
    let options = { }
    if (!Array.isArray(inputs)) {
      userInput = inputs.user
      options = inputs.options
    }

    helpers.runTest(
      suiteName,
      name,
      userInput,
      addSearchDoc,
      options
    )
  }
})
