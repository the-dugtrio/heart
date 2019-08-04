var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');

gulp.task('compile', function () {
    return gulp.src('../src/styles/*.css')
        .pipe(postcss())
        .pipe(cssmin())
        .pipe(gulp.dest('../lib/styles'));
});

gulp.task('copyfont', function () {
    return gulp.src('../src/styles/fonts/**')
        .pipe(cssmin())
        .pipe(gulp.dest('../lib/styles/fonts'));
});

gulp.task('build', ['compile', 'copyfont']);
