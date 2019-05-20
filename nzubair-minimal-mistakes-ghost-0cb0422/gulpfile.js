// based on https://andy-carter.com/blog/a-beginners-guide-to-the-task-runner-gulp

var gulp = require('gulp');

var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var zip = require("gulp-zip");
var uglify = require('gulp-uglify');

sass.compiler = require("node-sass");

// STYLES
gulp.task('sass', function(){
    return gulp.src('_sass/**/*.scss')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoprefixer({browsers: ['last 2 versions']}))
            .pipe(concat('main.css'))
            .pipe(gulp.dest('assets/css'));
});

gulp.task('prismcss', function(){
    return gulp.src('assets/css/prism.css')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(concat('prism.min.css'))
            .pipe(gulp.dest('assets/css'));
});

gulp.task('sass-dev', function(){
    return gulp.src('_sass/**/*.scss')
            .pipe(sass())
            .pipe(autoprefixer({browsers: ['last 2 versions']}))
            .pipe(concat('main.css'))
            .pipe(gulp.dest('assets/css'));
});

// JAVASCRIPT

gulp.task('js', function(){
    return gulp.src(['assets/js/vendor/jquery/jquery-1.12.4.min.js',
                     'assets/js/plugins/jquery.fitvids.js','assets/js/plugins/jquery.greedy-navigation.js','assets/js/plugins/jquery.magnific-popup.js','assets/js/plugins/jquery.smooth-scroll.min.js','assets/js/plugins/stickyfill.min.js','assets/js/_main.js'])
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('assets/js'));
});

gulp.task('prismjs',function(){
    return gulp.src('assets/js/prism.js')
            .pipe(concat('prism.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('assets/js'));
});


// BRING IT TOGETHER
gulp.task('zip', ['sass', 'prismcss', 'js', 'prismjs'], function () {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var themeVersion = require('./package.json').version;
    var filename = themeName + '-' + themeVersion + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**', '!sass/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
});

