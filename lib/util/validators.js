function noSpaces (msg = 'Spaces are not allowed') {
  return v => v.match(' ') ? msg : true
}
function notEmpty (msg = 'Must provide an answer') {
  return v => v.trim() === '' ? msg : true
}
function notEmptyNoSpaces (msg) {
  const ns = noSpaces(msg)
  const ne = notEmpty(msg)
  return v => {
    const m = ns(v)
    return (typeof m === 'string') ? m : ne(v)
  }
}

module.exports = {
  noSpaces,
  notEmpty,
  notEmptyNoSpaces
}
