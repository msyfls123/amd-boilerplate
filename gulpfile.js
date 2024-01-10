const gulp = require('gulp')
const requireConfig = require('./plugin/require-config')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const thirdParty = require('./plugin/third-party')
const fs = require('fs')
const path = require('path')

gulp.task('jsx', gulp.parallel(
  () => gulp.src('public/**/*.jsx')
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
    .pipe(gulp.dest('public')),
))

gulp.task('js', () =>
  gulp.src([
    'public/**/*.{js,jsx}',
    '!public/external/**/*',
    '!public/config*.js',
    '!**/*.jsx.js'
  ]).pipe(requireConfig({
    setupFile: 'public/setup.js',
    publicDir: path.join(__dirname, 'public'),
    entry: 'main',
    presets: JSON.parse(fs.readFileSync('public/presets.json'))
  }))
)

gulp.task('third-party', () => {
  return  thirdParty({
    config: JSON.parse(fs.readFileSync('./presets.json')),
    publicDir: 'public',
    configFile: 'public/config-presets.js',
    jsonFile: 'public/presets.json'
  })
})
