/* eslint-env mocha */

const bddStdin = require('bdd-stdin')
const stdMocks = require('std-mocks')
const path = require('path')
const fs = require('fs-extra')
const helpers = require('./test-helpers')

const initAction = require('../lib/actions').initAction

describe('tymly init', () => {
  const suiteName = 'init'
  let outputPath

  before(() => {
    outputPath = helpers.prepareFixture(suiteName)
  })

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
    '+overwrite all answers': [
      'John Smith',
      'West Bridgford Hockey Club',
      'wbhc',
      'johnsmith'
    ],
    '+overwrite no answers': [
      '',
      '',
      '',
      ''
    ],
    '+overwrite organisation answer': [
      '',
      'The Harlem Globetrotters',
      '',
      ''
    ]
  }

  for (const [testname, params] of Object.entries(tests)) {
    const update = testname[0] === '+'
    const name = testname.replace('+', '')
    it(name, async () => {
      stdMocks.use()

      const dirName = name.replace(/ /g, '-')

      if (update) {
        fs.copySync(
          path.join(path.dirname(outputPath), 'initial', dirName),
          path.join(outputPath, dirName)
        )
      }

      bddStdin(
        ...params.map(p => `${p}\n`)
      )

      await initAction({
        profile: path.join(outputPath, dirName)
      })

      stdMocks.restore()
      helpers.compareOutputs(suiteName, dirName)
    })
  }
})
