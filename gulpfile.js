var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    coffee = require('gulp-coffee'),
    minifyJS = require('gulp-uglify');

gulp.task('default', function() {
    gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('static/css'));

    gulp.src('src/coffee/*.coffee')
    .pipe(coffee())
    .pipe(minifyJS())
    .pipe(gulp.dest('static/js'));
});