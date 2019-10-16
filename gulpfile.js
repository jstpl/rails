var gulp = require('gulp');
//var concat = require('gulp-concat');
//var minify = require('gulp-minify');
//var concatCss = require('gulp-concat-css');
var replace = require('gulp-replace');
//var csso = require('gulp-csso');
//var clean = require('gulp-clean');
var config = require('./config/config');
var src = require('./config/src');
var build = require('./build/task/build');

gulp.task('build', build.main);
gulp.task('build-min', build.min);
gulp.task('build-vendor', build.vendor);
gulp.task('clean', build.clean);

gulp.task('build-all', function() {

    //build.clean();
    build.main();
    build.min();
    build.vendor();

});

gulp.task('renderScripts', function() {

    var html = '';
    for(var k in src.all) {
        var url = src.all[k];
        var item = '<script src="'+url+'"></script>';
        html = html + "\n" + item;
    }

    //console.log(html);

    gulp.src([config.src.path + '/index.html'])
        .pipe(replace('<!--SCRIPT_PLACEHOLDER-->', html))
        .pipe(gulp.dest('.'));

    //console(gulp.src('./dist/script/all.js').sourcemaps());

});
