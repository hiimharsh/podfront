// grab our gulp packages
var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    uglify      = require('gulp-uglify'),
    exec        = require('gulp-exec'),
    rename      = require('gulp-rename'),
    sass        = require('gulp-sass'),
    watch       = require('gulp-watch'),
    connect     = require("gulp-connect"),
    minifyHTML  = require('gulp-minify-html'),
    gulpCopy    = require('gulp-copy'),
    open        = require('gulp-open'),
    minifyCss   = require('gulp-minify-css'),
    webserver   = require('gulp-webserver');

// gulp scripts tasks
gulp.task('scripts', function() {
  gulp.src(['./js/*.js', '!./js/*.min.js'])
  .pipe(rename({suffix:'.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('./js'));
});

// gulp sass development task
gulp.task('sass:development', function() {
    gulp.src(['./sass/*.sass', './scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss({
            keepSpecialComments: 0,
            rebase: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

gulp.task('connect:html', function() {
    gulp.src(['./*.html', './**/*.html'])
        .pipe(connect.reload());
});
gulp.task('connect:js', function() {
    gulp.src(['./*.js', './js/*.js'])
        .pipe(connect.reload());
});

// gulp copy tasks
gulp.task('copy:img', function() {
    return gulp.src("./img/**")
        .pipe(gulpCopy("./live/"));
});

gulp.task('copy:fonts', function() {
    return gulp.src("./fonts/**")
        .pipe(gulpCopy("./live/"));
});

// gulp watch tasks
gulp.task('watch:all', function() {
  connect.server({
      root: './',
      port: 8000,
      livereload: true
  });
  gulp.src(__filename)
    // .pipe(webserver({
    //   livereload: true,
    //   directoryListing: true,
    //   open: true
    // }))
    .pipe(open({
        uri: 'http://localhost:8000'
    }));
  //gulp.watch(['./*.html', './**/*.html', './sass/*.sass', './scss/*.scss', './js/*.js'], ['jade:development', 'sass:development', 'connect:html', 'connect:js', 'connect:jade', 'runExpress']);
  gulp.watch(['./*.html', './**/*.html', './*.js', './js/*.js', './views/*.jade'], ['connect:html', 'connect:js']);
  gulp.watch(['./sass/*.sass', './scss/*.scss'], ['sass:development']);
});

// create a default task and just log a message
//gulp.task('watch', ["scripts", "sass:development", "watch:all"]);
//gulp.task('default', ["scripts", "jade:development", "sass:development", "watch:all"]);
gulp.task('default', ["sass:development", "watch:all"]);
gulp.task('copy', ["copy:img", "copy:fonts"]);
