var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var zip = require('gulp-zip');

var swallowError = function swallowError(error) {
  gutil.log(error.toString());
  gutil.beep();
  this.emit('end');
};

var nodemonServerInit = function() {
  livereload.listen(1234);
};

gulp.task('build', ['sass'], function() {
  return nodemonServerInit();
});

gulp.task('sass', function() {
  return gulp
    .src('assets/scss/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', swallowError))
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/built/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('assets/scss/**', ['sass']);
});

gulp.task('zip', ['sass'], function() {
  var targetDir = 'dist/';
  var themeName = require('./package.json').name;
  var filename = themeName + '.zip';

  return gulp
    .src(['**', '!node_modules', '!node_modules/**', '!dist', '!dist/**'])
    .pipe(zip(filename))
    .pipe(gulp.dest(targetDir));
});

gulp.task('default', ['build'], function() {
  gulp.start('watch');
});
