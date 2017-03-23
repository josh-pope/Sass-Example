/**
 *  Gulp Task Manager 
 *   + manages all aspects of local site development and deployment
 *   + deploy files are server-ready from the ./dist directory
 *
 *   @auth    Josh Pope 
 *   @contact joshwpope@gmail.com
 */
 
var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    clean       = require('gulp-clean'),
    minifyHtml  = require("gulp-minify-html"),
    minifyCss   = require("gulp-minify-css"),
    uglify      = require("gulp-uglify"),
    rename      = require("gulp-rename"),
    reload      = browserSync.reload;
 
const autoprefixer = require('gulp-autoprefixer');
 
 
/* ---------- internal stackla build tasks  ---------- */
 
// sass compilation and css minifcation
gulp.task('sass', ['minify-css'], function() {
  gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
 
     
    gulp.run('init-complete');
});
 
// add any prefixes
 
gulp.task("init-complete", function(){
  console.log("  ###  init-complete  ###");
  })
 
 
// generic browser sync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})
 
// clean out the dist directory in preparation for compilation
gulp.task('clean', function(){
  return gulp.src(['dist/*'], {read:false})
  .pipe(clean());
});
 
// move files from app directory to dist directory
// used for files not minified (fonts, etc)
gulp.task('move', function(){
  // move files from app to dist folder- ignoring folders scss, css and js- those are moved using the minification functions below
  gulp.src(['app/*', 'app/**/*', '!app/scss/**/*','!app/scss','!app/css' ,'!app/css/*','!app/js' ,'!app/js/*','!app/js/**/*'], { dot: true })
  .pipe(gulp.dest('dist'));
});
 
 
// js compressor
gulp.task('minify-js', ['refresh'],function () {
    gulp.src('./app/js/*.js') // path to your files
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
    gulp.src('./app/js/base/*.js') // path to your files
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/base/'));
    gulp.src('./app/js/vendor/*.js') // path to your files
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/vendor/'));
    console.log('- minified javascript - browser refreshed')
 
});
 
// css compressor
gulp.task('minify-css', ['refresh'],function () {
    gulp.src('./app/css/*.css') // path to your file
 
    .pipe(minifyCss())
            .pipe(gulp.dest('./dist/css/'));
 
    console.log('- minified css - browser refreshed')
});
 
// html compressor
gulp.task('minify-html', ['move', 'refresh'],function () {
    gulp.src('./app/*.html') // path to your files
    .pipe(minifyHtml())
    .pipe(gulp.dest('./dist/'));
    console.log('- minified html - browser refreshed')
});
 
 
gulp.task('refresh', function (){
  setTimeout(function(){
    reload();
  },300);
});
 
// create a custom watch method - overcomes some issues with browser.reload and the default watch method
gulp.task('watch',function(cb){
    gulp.watch(['app/*.html'], ['minify-html'], browserSync.reload);
    gulp.watch(['app/js/*.js'], ['minify-js'], browserSync.reload);
    gulp.watch('app/scss/**/*', ['sass'], browserSync.reload);
});
 
gulp.task('dist', ['move','minify-html','minify-js','minify-css', 'sass']);
 
/* ---------- external stackla build tasks  ---------- */
gulp.task('build', [ 'dist', 'refresh','sass']);
 
// just call 'gulp' from the command line
gulp.task('default', ['browserSync','build', 'watch', 'minify-js'], function (){ 
    console.log("\n ## Stackla Application - Initialized\n")
        gulp.watch('app/scss/**/*', ['sass'], browserSync.reload);

});