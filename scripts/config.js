const path = require('path')

const outDir = path.join(__dirname, '../dist')
const indexFile = 'index.html'
const entryFile = path.join(__dirname, '../src', indexFile)

module.exports = config = {
  outDir,
  indexFile,
  entryFile
}
