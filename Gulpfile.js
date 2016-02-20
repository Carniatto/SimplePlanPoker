var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    ghPages = require('gulp-gh-pages'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify');

gulp.task('deploy', function() {
  return gulp.src('./app/**/*')
    .pipe(ghPages());
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    host: '0.0.0.0',
    livereload: true
  });
});

// Basic usage
gulp.task('scripts', function() {
  // Single entry point to browserify
  gulp.src('./app/app.js')
        .pipe(browserify({
          insertGlobals: true
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./app/build/js'));
});

gulp.task('url', function() {
  var options = {
    url: 'http://localhost:8080'
  };
  gulp.src('./app/index.html')
  .pipe(open('', options));
});

gulp.task('change', function() {
  gulp.src('./app/**/*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./app/**/*'], ['change']);
});

gulp.task('default', ['scripts','connect','url','watch']);
