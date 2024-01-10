const through = require('through2')
const madge = require('madge')

module.exports = function() {
  return through.obj(async function(file, encoding, callback) {
    const dependencies = await madge(file.path, {
      baseDir: 'public',
      includeNpm: true,
      fileExtensions: ['js', 'jsx'],
      requireConfig: 'public/config-third-party.js'
    })
    console.log(file.path, dependencies.tree, dependencies.skipped, '\n\n')
    callback(null, file)
  }, (_flush) => {
    console.log('flushed')
    _flush()
  })
}
