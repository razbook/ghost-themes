var gulp = require('gulp');

// gulp plugins and utils
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var zip = require('gulp-zip');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var sass = require('gulp-sass');

var swallowError = function swallowError(error) {
    gutil.log(error.toString());
    gutil.beep();
    this.emit('end');
};

var nodemonServerInit = function () {
    livereload.listen(1234);
};

gulp.task('build', ['css', 'js'], function (/* cb */) {
    return nodemonServerInit();
});

gulp.task('generate', ['css', 'js']);

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('assets/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/built'));
});

gulp.task('sass:watch', function () {
  gulp.watch('assets/css/*.scss', ['sass']);
});

gulp.task('js', function () {
    var jsFilter = filter(['**/*.js'], {restore: true});

    return gulp.src('assets/js/*.js')
        .on('error', swallowError)
        .pipe(sourcemaps.init())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/built/'))
        .pipe(livereload());
});

gulp.task('zip', ['sass', 'js'], function () {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
});

gulp.task('default', ['build'], function () {
    gulp.start('watch');
});
