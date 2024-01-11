const through = require('through2')
const madge = require('madge')
const path = require('path')
const debug = require('debug')('require-config')
const fs = require('fs')

function createPathPair(filePath, publicDir) {
  const relativePath = path.relative(publicDir, filePath)
  return {
    key: relativePath.replace(/\.js$/, ''),
    value: relativePath.replace(/\.js$/, '')
  }
}

module.exports = function(options) {
  const { setupFile, entry, publicDir, presets } = options

  const config = { ...presets }

  return through.obj(function(file, encoding, callback) {
    if (process.env.DEBUG) {
      madge(file.path, {
        baseDir: 'public',
        includeNpm: true,
        fileExtensions: ['js', 'jsx'],
        requireConfig: 'public/presets.js'
      }).then((dependencies) => {
        debug({
          path: file.path,
          tree: dependencies.tree,
          skipped: dependencies.skipped
        })
      })
    }
    
    const { key, value } = createPathPair(file.path, publicDir)
    config[key] = value
    callback(null, file)
  }, (_flush) => {
    fs.writeFileSync(
      setupFile,
      `require.config({
  enforceDefine: true,
  paths: ${JSON.stringify(config, null, 4)}
});
define('setup', ['${entry}'], function() {});`,
      { encoding: 'utf-8' },
    )
    debug('flushed')
    _flush()
  })
}
