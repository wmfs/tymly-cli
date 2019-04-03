/* eslint-env mocha */

const path = require('path')

const helpers = require('./test-helpers')

const addTable = require('../lib/actions').addTableAction

const suiteName = 'add-table'

describe(`tymly ${suiteName}`, () => {
  const tests = {
    'one-model': [
      '', // generated form title
      '', // generated form description
      '', // category
      'Y',
      ''
    ]
  }

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
      addTable,
      options
    )
  }
})
