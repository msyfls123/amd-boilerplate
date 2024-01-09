const gulp = require('gulp')
const requireConfig = require('./plugin/require-config')
const rename = require('gulp-rename')
const babel = require('gulp-babel')

gulp.task('js', gulp.parallel(
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
  () => gulp.src('public/**/*.js')
    .pipe(requireConfig()),
))
