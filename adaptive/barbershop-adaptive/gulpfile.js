'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require("browser-sync").create();

var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var htmlmin = require('gulp-htmlmin');

var csso = require('gulp-csso');
var rename = require('gulp-rename');

var uglify = require('gulp-uglify');



gulp.task('html', function() {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin())
    .pipe(gulp.dest('build'));
});

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(gulp.csso())
    .pipe(gulp.rename(style.min.css))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('js', function() {
  return gulp.src('source/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});







gulp.task('server', function () {
  server.init({
    server: "source/"
  });

  gulp.watch('source/**/*.scss', gulp.series('css'))
  gulp.watch('source/**/*.html').on('change', server.reload);
});


gulp.task('start', gulp.series('css', 'server'));