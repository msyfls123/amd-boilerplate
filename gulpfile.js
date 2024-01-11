const gulp = require('gulp')
const requireConfig = require('./plugin/require-config')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const thirdParty = require('./plugin/third-party')
const fs = require('fs')
const path = require('path')

const ALL_JS_SOURCE_PATTERN = [
  'public/**/*.{js,jsx}',
  '!public/external/**/*',
  '!public/presets.js',
  '!public/setup.js',
  '!**/*.jsx.js'
]

const ALL_JSX_PATTERN = [
  'public/**/*.jsx'
]

gulp.task('jsx', (
  () => gulp.src(ALL_JSX_PATTERN)
    .pipe(babel({
      presets: [[
        '@babel/preset-react',
        {}
      ]]
    }))
    .pipe(rename((path) => {
      return {
        ...path,
        extname: '.jsx.js'
      }
    }))
    .pipe(gulp.dest('public'))
))

gulp.task('setup', () =>
  gulp.src(ALL_JS_SOURCE_PATTERN).pipe(requireConfig({
    setupFile: 'public/setup.js',
    publicDir: path.join(__dirname, 'public'),
    entry: 'main',
    presets: JSON.parse(fs.readFileSync('public/presets.json'))
  }))
)

gulp.task('presets', () => {
  return  thirdParty({
    config: JSON.parse(fs.readFileSync('./presets.json')),
    publicDir: 'public',
    configFile: 'public/presets.js',
    jsonFile: 'public/presets.json'
  })
})

gulp.task('watch', gulp.parallel(
  function watchJSX () { return gulp.watch(ALL_JSX_PATTERN, gulp.task('jsx')) },
  function watchJS () { return gulp.watch(ALL_JS_SOURCE_PATTERN, gulp.task('setup')) }
))

gulp.task('default', gulp.series(
  gulp.task('presets'),
  gulp.parallel(
    gulp.task('jsx'),
    gulp.task('setup')
  )
))
