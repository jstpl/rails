var gulp = require('gulp');
var concat = require('gulp-concat');
const minify = require('gulp-minify');

var sourceFiles = [
    './vendor/jquery/jquery-2.2.4.min.js',
    './vendor/jquery/jquery-ui-1.12.1.min.js',
    './vendor/lodash/4.17.15/lodash.js',
    './vendor/bootstrap/3.3.7/bootstrap.min.js',

    './bundle/kernel/namespace.js',

    './bundle/helper/ajax.js',
    './bundle/helper/array.js',
    './bundle/helper/class.js',
    './bundle/helper/func.js',
    './bundle/helper/php.js',
    './bundle/helper/url.js',
    './bundle/helper/value.js',
    './bundle/helper/jquery.js',

    './bundle/log/logService.js',
    './bundle/notify/notifyService.js',
    './bundle/notify/notifyTypeEnum.js',
    './bundle/queue/queueService.js',
    './bundle/ui/baseElementService.js',
    './bundle/ui/baseModule.js',

    './bundle/env/envEnum.js',
    './bundle/env/envService.js',

    './bundle/kernel/container.js',
    './bundle/kernel/bootstrap.js',
    './bundle/kernel/func.js',

    './bundle/domain/baseMemoryStore.js',
    './bundle/domain/baseLocalStorage.js',
    './bundle/cache/cacheService.js',
    './bundle/event/eventService.js',
    './bundle/rest/client.js',

    './bundle/legalbet/bootstrap.js',
    './bundle/widget/form/input.js',
    './bundle/widget/form/formWidget.js',
    './bundle/widget/tabs/tabsWidget.js',
    './bundle/widget/action/actionWidget.js',

    './vendor/director/director-1.2.6.min.js',

    './bundle/spa/layer.js',
    './bundle/spa/router.js',
    './bundle/vue/loader.js',
    './bundle/vue/vm.js',

    './module/app/config/route.js',
    './module/contact/config/route.js',
    './module/todo/config/route.js',
    './module/user/config/route.js',
    './module/person/config/route.js',
    './module/user/store/identityStore.js',
    './module/user/service/authService.js',
    './module/user/lang/ru/auth.js',

    './module/notify/enum/notifyTypeEnum.js',
    './module/notify/service/notifyService.js',

    './module/navbar/navbarController.js',

    './module/app/config/alias.js',
    './module/app/bootstrap.js',

    './vendor/redux/redux-3.5.2.min.js',
    './vendor/vue/vue-2.6.10.js',

    './vendor/toastr/toastr-2.1.4.min.js',
];

gulp.task('build', function() {

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
        .pipe(minify())
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
        .pipe(minify())
        .pipe(gulp.dest('./dist/js/'));

});

/*
    <link  href="/vendor/toastr/toastr-2.1.4.min.css" rel="stylesheet">*/
    
    