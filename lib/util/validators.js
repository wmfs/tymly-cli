function noSpaces(msg = 'Spaces are not allowed') {
  return v => v.match(' ') ? msg : true
}

module.exports = {
  noSpaces
}