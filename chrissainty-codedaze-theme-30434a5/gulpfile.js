var gulp = require('gulp');
var concat = require('gulp-concat');

// gulp plugins and utils
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var zip = require('gulp-zip');

// postcss plugins
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var easyimport = require('postcss-easy-import');

gulp.task('css', function () {
    var themeName = require('./package.json').name;
    var filename = themeName + '.min.css';
    var processors = [
        easyimport,
        customProperties,
        colorFunction(),
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];

    return gulp.src([
        'assets/css/normalise.css',
        'assets/css/milligram.css',
        'assets/css/vs2015.css',
        'assets/css/site.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(concat(filename))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('zip', ['css'], function () {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!assets/css/normalise.css',
        '!assets/css/milligram.css',
        '!assets/css/vs2015.css',
        '!assets/css/site.css',
        '!node_modules', 
        '!node_modules/**',
        '!dist', 
        '!dist/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
});