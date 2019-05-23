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
    'assets/js/*.js',
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

const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');

const vendors_files = ['vendor/handlebars-runtime-3/handlebars-v4.1.2.js'];
function vendor() {
    return src(vendors_files)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'));
}

const hbs_files = [
    './assets/templates/**/*.hbs'
];
function hbs() {
    return src(hbs_files)
    // Compile each Handlebars template source file to a template function
        .pipe(handlebars())
        // Wrap each template function in a call to Handlebars.template
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        // Declare template functions as properties and sub-properties of MyApp.templates
        .pipe(declare({
            namespace: 'Reversi',
            noRedeclare: true, // Avoid duplicate declarations
            processName: function(filePath) {
                // Allow nesting based on path using gulp-declare's processNameByPath()
                // You can remove this option completely if you aren't using nested folders
                // Drop the client/templates/ folder from the namespace path by removing it from the filePath
                return declare.processNameByPath(filePath.replace('client/templates/', ''));
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist/js/'));
}

// Watch files
function watch() {
    gulp.watch(html_files, html);
    gulp.watch(sass_files, css);
    gulp.watch(js_files, js);
    gulp.watch(vendors_files, vendor);
    gulp.watch(hbs_files, hbs);
}

exports.watch = watch;
exports.build = parallel(html, css, js, hbs, vendor);

