const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp")
const htmlmin = require('gulp-htmlmin');
var cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');


//required paths
var globs = {
  html: "project/*.html",
  css: "project/css/**/*.css",
  img: 'project/pics/*',
  js: 'project/js/**/*.js'
}


//minify the main html file
function htmlTask() {
  return src(globs.html) //file call
    .pipe(htmlmin({ removeComments: true, collapseWhitespace: true })) //minify by remove comments/spaces
    .pipe(gulp.dest('dist')) // store it in the dist folder
}


//minify css files 
function cssTask() {
  return src(globs.css)
    .pipe(concat('style.min.css')) //concat all files in one file
    .pipe(cleanCss()) //minify this file
    .pipe(dest('dist/css'))
}



//minify js files 
function jsTask() {
  return src(globs.js)
    .pipe(concat('build.min.js'))
    .pipe(terser())
    .pipe(dest('dist/assets/js'))
}



//minify images 
function imgTask() {
  return gulp.src(globs.img)
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}


// watch task to watch any change
function watchTask() {
  watch(globs.html, htmlTask)
  watch(globs.js, jsTask)
  watch(globs.css, cssTask);
  watch(globs.img, imgTask);
}


exports.default = series(parallel(htmlTask, cssTask, jsTask, imgTask), watchTask)





