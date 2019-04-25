const { gulp, src, dest, parallel } = require('gulp');

function html() {
    return src('./**/*.html').pipe(dest('dist'));
}


const clean_css = require('gulp-clean-css');
const auto_prefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

function css() {
   return src('./assets/css/**/*.css')
       .pipe(clean_css({compatibility: 'ie9'}))
       .pipe(auto_prefixer('last 2 version', 'safari 5', 'ie 9'))
       .pipe(concat('style.min.css'))
       .pipe(gulp.dest('./dist'));
}

exports.build = parallel(html, css);
