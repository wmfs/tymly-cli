/* eslint-env mocha */

const path = require('path')
const helpers = require('./test-helpers')

const initAction = require('../lib/actions').initAction

describe('tymly init', () => {
  const tests = {
    'fill out all answers': [
      'Jane Doe',
      'West Midlands Fire Service',
      'wmfs',
      'wmfs'
    ],
    'default org name from organisation initials': [
      'Jane Doe',
      'West Midlands Fire Service',
      '',
      ''
    ],
    'default org name from organisation if single word': [
      'Jane Doe',
      'WestMidlandsFireService',
      '',
      'wmfs'
    ],
    'default npm org to wmfs org': [
      'Jane Doe',
      'The Trousers',
      'wmfs',
      ''
    ],
    'no blanks allowed in github or npm org': [
      'Jane Doe',
      'West Midlands Fire Service',
      'w m f s',
      helpers.backspace + 'wmfs',
      'w m f s',
      helpers.backspace + 'wmfs'
    ],
    'overwrite all answers': [
      'John Smith',
      'West Bridgford Hockey Club',
      'wbhc',
      'johnsmith'
    ],
    'overwrite no answers': [
      '',
      '',
      '',
      ''
    ],
    'overwrite organisation answer': [
      '',
      'The Harlem Globetrotters',
      '',
      ''
    ]
  }

  const suiteName = 'init'

  before(() => {
    helpers.prepareFixture(suiteName)
  })

  for (const [name, inputs] of Object.entries(tests)) {
    helpers.runTest(
      suiteName,
      name,
      inputs,
      initAction,
      {
        profile: name
      }
    )
  }
})
