var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var concatCss = require('gulp-concat-css');
var replace = require('gulp-replace');
var csso = require('gulp-csso');

var styleSrc = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',


    //'./vendor/bootstrap/3.3.7/bootstrap.min.css',
    './vendor/bootstrap/3.3.7/bootstrap-theme.min.css',

    './vendor/toastr/toastr-2.1.4.min.css',
];

var vendorSrc = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/lodash/lodash.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/director/build/director.min.js',
    './node_modules/redux/dist/redux.min.js',
    './node_modules/vue/dist/vue.min.js',
    './node_modules/toastr/build/toastr.min.js',
    './node_modules/jquery-ui/jquery-ui.min.js',

    //'./vendor/jquery/jquery-2.2.4.min.js',
    //'./vendor/jquery/jquery-ui-1.12.1.min.js',
    //'./vendor/lodash/4.17.15/lodash.js',
    //'./vendor/bootstrap/3.3.7/bootstrap.min.js',
    //'./vendor/director/director-1.2.6.min.js',
    //'./vendor/redux/redux-3.5.2.min.js',
    //'./vendor/vue/vue-2.6.10.js',
    //'./vendor/toastr/toastr-2.1.4.min.js',
];


var bundleSrc = [
    './bundle/kernel/namespace.js',
    './bundle/kernel/container.js',
    './bundle/kernel/bootstrap.js',
    './bundle/kernel/func.js',

    './bundle/helper/*.js',
    './bundle/env/*.js',
    './bundle/event/*.js',
    './bundle/log/*.js',
    './bundle/queue/*.js',
    './bundle/ui/*.js',
    './bundle/notify/*.js',
    './bundle/domain/*.js',
    './bundle/cache/*.js',
    './bundle/rest/*.js',
    './bundle/legalbet/*.js',
    './bundle/widget/*.js',
    './bundle/spa/*.js',
    './bundle/vue/*.js',
];

var appSrc = [

    './module/navbar/**/*.js',

    './module/user/store/*.js',
    './module/user/service/*.js',
    './module/user/lang/ru/*.js',

    './module/contact/store/*.js',
    './module/contact/service/*.js',

    './module/notify/enum/*.js',
    './module/notify/service/*.js',

    './module/bootstrap/**/*.js',

    './module/**/config/*.js',
    './module/app/bootstrap.js',
    './module/app/run.js',
];

var allSrc = vendorSrc.concat(bundleSrc).concat(appSrc);

gulp.task('renderScripts', function() {

    var html = '';
    for(var k in allSrc) {
        var url = allSrc[k];
        var item = '<script src="'+url+'"></script>';
        html = html + "\n" + item;
    }

    //console.log(html);

    gulp.src(['./src/index.html'])
        .pipe(replace('<!--SCRIPT_PLACEHOLDER-->', html))
        .pipe(gulp.dest('.'));

    //console(gulp.src('./dist/script/all.js').sourcemaps());

});

gulp.task('build', function() {

    gulp.src(styleSrc)
        .pipe(concatCss("app.css"))
        .pipe(gulp.dest('./dist/style/'));

    gulp.src(allSrc, { sourcemaps: true })
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/script/'));

    gulp.src(vendorSrc, { sourcemaps: true })
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dev/script/'));

    /*gulp.src(bundleSrc, { sourcemaps: true })
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist/script/'));

    gulp.src(appSrc, { sourcemaps: true })
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/script/'));*/

});

gulp.task('min', function() {

    gulp.src('./dist/script/all.js')
        .pipe(minify())
        .pipe(gulp.dest('./dist/script/'));

    gulp.src([
        './dist/style/app.css',
    ])
        .pipe(minify())
        .pipe(gulp.dest('./dist/style/'));

    gulp.src('./dist/style/app.css')
        .pipe(csso())
        .pipe(gulp.dest('./dist/style/min'));

});
