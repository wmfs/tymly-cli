/* eslint-env mocha */

const fail = require('assert').fail

const bddStdin = require('bdd-stdin')
const stdMocks = require('std-mocks')
const path = require('path')
const fs = require('fs-extra')

const helpers = require('./test-helpers')

const addModelTest = require('../lib/actions').addModelAction

describe('tymly add-model', () => {
  const tests = {
    'named-pizza': [
      'A pizza',
      'name',
      'string',
      'Y',
      'Y',
      '',
      'Y'
    ]
  }

  const suiteName = 'add-model'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    helpers.runTest(
      suiteName,
      name,
      inputs,
      addModelTest,
      { }
    )
  }
})

