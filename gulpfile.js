const gulp = require('gulp')
const requireConfig = require('./plugin/require-config')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const thirdParty = require('./plugin/third-party')
const fs = require('fs')

gulp.task('jsx', gulp.parallel(
  () => gulp.src('public/**/*.jsx')
    .pipe(requireConfig())
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
    'public/**/*.js',
    '!public/external/**/*',
    '!public/config*.js',
    '!**/*.jsx.js'
  ]).pipe(requireConfig())
)

gulp.task('third-party', () => {
  return  thirdParty({
    config: JSON.parse(fs.readFileSync('./preset.json')),
    publicDir: 'public',
    configFile: 'public/config-third-party.js'
  })
})