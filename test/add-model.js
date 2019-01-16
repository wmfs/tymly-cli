/* eslint-env mocha */

const fail = require('assert').fail

const bddStdin = require('bdd-stdin')
const stdMocks = require('std-mocks')
const path = require('path')
const fs = require('fs-extra')

const helpers = require('./test-helpers')

const addModel = require('../lib/actions').addModelAction

describe('tymly add-model', () => {
  const suiteName = 'add-model'
  let outputPath

  before(() => {
    outputPath = helpers.prepareFixture(suiteName)
  })

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

  for (const [name, params] of Object.entries(tests)) {
    it(name, async () => {
      stdMocks.use()

      const dirName = name.replace(/ /g, '-')

      bddStdin(
        ...params.map(p => `${p}\n`)
      )

      await addModel()

      stdMocks.restore()
      helpers.compareOutputs(suiteName, dirName)
    })
  }
})

