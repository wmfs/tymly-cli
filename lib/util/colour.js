const color = require('ansi-color').set

function c (colorName) {
  return text => color(text, colorName)
}

module.exports = {
  red: c('red'),
  yellow: c('yellow'),
  cyan: c('cyan')
}
