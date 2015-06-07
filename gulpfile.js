var gulp = require('gulp'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename');

gulp.task('default', function () {
  return gulp.src('src/api.js')
    .pipe(babel())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./'));
});
