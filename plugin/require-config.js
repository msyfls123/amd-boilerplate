const through = require('through2')

module.exports = function() {
  return through.obj(function(file, encoding, callback) {
    console.log(file.path)
    callback(null, file)
  }, (_flush) => {
    console.log('flushed')
    _flush()
  })
}
