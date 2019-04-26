const gulp = require('gulp');
const { src, parallel } = require('gulp');

/** EVERYTHING RELATED TO HTML **/
let html_files = './*.html';

function html() {
    return src(html_files)
            .pipe(gulp.dest('./dist'));
}

/** EVERYTHING RELATED TO CSS **/
const clean_css = require('gulp-clean-css');
const auto_prefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

let sass_files = './assets/css/scss/**/*.scss';

function css() {
    return gulp.src(sass_files)
            .pipe(sass().on('error', sass.logError))
            .pipe(clean_css({compatibility: 'ie9'}))
            .pipe(auto_prefixer('last 2 version', 'safari 5', 'ie 9'))
            .pipe(concat('style.min.css'))
            .pipe(gulp.dest('./dist'));
}

/** EVERYTHING RELATED TO JS **/
const order = require('gulp-order');
const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');
const js_files = [
    'assets/js/**/*.js',
];

function js() {
    return src(js_files)
        .pipe(order(js_files, { base: './' }))
        .pipe(concat('app.js'))
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify(js_files))
        .pipe(gulp.dest('./dist/js'));
}

// Watch files
function watch() {
    gulp.watch(html_files, html);
    gulp.watch(sass_files, css);
    gulp.watch(js_files, js);
}

exports.watch = watch;
exports.build = parallel(html, css, js);
