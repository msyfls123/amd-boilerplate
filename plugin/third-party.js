const gulp = require('gulp')
const rename = require('gulp-rename')
const path = require('path')
const fs = require('fs')

const tmpl = (strings, ...args) => strings.reduce((acc, v, i) => acc + v + (args[i] || ''), '')

module.exports = function (options) {
  const { config, publicDir, configFile, jsonFile } = options

  const requirePaths = Object.fromEntries(Object.entries(config)
    .map(([key, item]) => [key, item.to.replace(/\.js$/, '')])
  )

  return gulp.src(
    Object.values(config).map(item => item.from)
  ).pipe(rename((pathInfo, file) => {
    const item = Object.values(config).find(item => file.path.endsWith(item.from))
    const extname = path.extname(item.to)
    return {
      dirname: path.dirname(item.to),
      basename: path.basename(item.to, extname),
      extname,
    }
  }))
    .pipe(gulp.dest(publicDir))
    .on('end', () => {
      fs.writeFileSync(
        configFile,
        tmpl`require.config({
paths: ${JSON.stringify(requirePaths, null, 2)}
})`,
        { encoding: 'utf-8' },
      )
      fs.writeFileSync(
        jsonFile,
        JSON.stringify(requirePaths, null, 2),
        { encoding: 'utf-8' }
      )
    })
}
