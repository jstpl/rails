var gulp = require('gulp');
var concat = require('gulp-concat');
const minify = require('gulp-minify');
var concatCss = require('gulp-concat-css');

gulp.task('build', function() {

    gulp.src([
        './vendor/bootstrap/3.3.7/bootstrap.min.css',
        './vendor/bootstrap/3.3.7/bootstrap-theme.min.css',
        './vendor/toastr/toastr-2.1.4.min.css',
    ])
        .pipe(concatCss("app.css"))
        .pipe(gulp.dest('./dist/style/'));

    gulp.src([
        './vendor/jquery/jquery-2.2.4.min.js',
        './vendor/jquery/jquery-ui-1.12.1.min.js',
        './vendor/lodash/4.17.15/lodash.js',
        './vendor/bootstrap/3.3.7/bootstrap.min.js',
        './vendor/director/director-1.2.6.min.js',
            './vendor/redux/redux-3.5.2.min.js',
            './vendor/vue/vue-2.6.10.js',
            './vendor/toastr/toastr-2.1.4.min.js',
            //'./vendor/toastr/toastr-2.1.4.min.css',

        //'./vendor/**/*.js'
    ], { sourcemaps: true })
        .pipe(concat('vendor.js'))
        //.pipe(minify())
        .pipe(gulp.dest('./dist/js/'));

    gulp.src([
        './bundle/kernel/namespace.js',
        './bundle/helper/*.js',
        './bundle/env/*.js',
        './bundle/log/*.js',
        './bundle/notify/*.js',
        './bundle/queue/*.js',
        './bundle/ui/*.js',
        './bundle/kernel/container.js',
        './bundle/kernel/bootstrap.js',
        './bundle/kernel/func.js',
        './bundle/domain/*.js',
        './bundle/cache/*.js',
        './bundle/event/*.js',
        './bundle/rest/*.js',
        './bundle/legalbet/*.js',
        './bundle/widget/*.js',
        './bundle/spa/*.js',
        './bundle/vue/*.js',

        //'./bundle/**/*.js',
    ], { sourcemaps: true })
        .pipe(concat('bundle.js'))
        //.pipe(minify())
        .pipe(gulp.dest('./dist/js/'));

    gulp.src([
        './module/**/config/*.js',
        './module/app/bootstrap.js',
        './module/navbar/**/*.js',

        //'./module/user/config/*.js',
        './module/user/store/*.js',
        './module/user/service/*.js',
        './module/user/lang/ru/*.js',

        //'./module/contact/config/*.js',
        './module/contact/store/*.js',
        './module/contact/service/*.js',

        './module/notify/enum/*.js',
        './module/notify/service/*.js',



    ], { sourcemaps: true })
        .pipe(concat('app.js'))
        //.pipe(minify())
        .pipe(gulp.dest('./dist/js/'));

});

/*
    <link  href="/vendor/toastr/toastr-2.1.4.min.css" rel="stylesheet">*/
    
    