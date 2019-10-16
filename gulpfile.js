var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var concatCss = require('gulp-concat-css');
var replace = require('gulp-replace');
var csso = require('gulp-csso');
var clean = require('gulp-clean');

var config = {
    dev: {},
    dist: {},
    min: {},
    src: {},
};

config.src.path = './src';

config.dev.path = './src/vendor';
config.dev.scriptOutputPath = config.dev.path + '/';
config.dev.styleOutputPath = config.dev.path + '/';
config.dev.scriptFileName = 'app.js';
config.dev.styleFileName = 'app.css';



config.dist.path = './dist';
config.dist.scriptOutputPath = config.dist.path + '/script/';
config.dist.styleOutputPath = config.dist.path + '/style/';

config.min.path = './dist/min';
config.min.scriptOutputPath = config.min.path + '/script/';
config.min.styleOutputPath = config.min.path + '/style/';

var styleSrc = [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/bootstrap/dist/css/bootstrap-theme.css',
    './node_modules/toastr/build/toastr.min.css',
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
];


var bundleSrc = [
    config.src.path + '/bundle/kernel/namespace.js',
    config.src.path + '/bundle/kernel/container.js',
    config.src.path + '/bundle/kernel/bootstrap.js',
    config.src.path + '/bundle/kernel/func.js',

    config.src.path + '/bundle/helper/*.js',
    config.src.path + '/bundle/env/*.js',
    config.src.path + '/bundle/event/*.js',
    config.src.path + '/bundle/log/*.js',
    config.src.path + '/bundle/queue/*.js',
    config.src.path + '/bundle/ui/*.js',
    config.src.path + '/bundle/notify/*.js',
    config.src.path + '/bundle/domain/*.js',
    config.src.path + '/bundle/cache/*.js',
    config.src.path + '/bundle/rest/*.js',
    config.src.path + '/bundle/legalbet/*.js',
    config.src.path + '/bundle/widget/*.js',
    config.src.path + '/bundle/spa/*.js',
    config.src.path + '/bundle/vue/*.js',
];

var appSrc = [
    config.src.path + '/module/user/store/*.js',
    config.src.path + '/module/user/service/*.js',
    config.src.path + '/module/user/lang/ru/*.js',

    config.src.path + '/module/contact/store/*.js',
    config.src.path + '/module/contact/service/*.js',

    config.src.path + '/module/notify/enum/*.js',
    config.src.path + '/module/notify/service/*.js',

    config.src.path + '/module/bootstrap/**/*.js',

    config.src.path + '/module/**/config/*.js',
    config.src.path + '/module/app/controller/*.js',
    config.src.path + '/module/app/view/*.js',

    config.src.path + '/module/app/bootstrap.js',
    config.src.path + '/module/app/run.js',
];

var allSrc = vendorSrc.concat(bundleSrc).concat(appSrc);

var build = {
    firstCharExp: /^([\s\S]{1})/g,
    clean: function () {
        return gulp.src([
            config.dist.path,
            config.dev.path,
        ], {read: false})
            .pipe(clean());
    },
    main: function () {
        gulp.src(styleSrc)
            .pipe(concatCss(config.dev.styleFileName))
            .pipe(gulp.dest(config.dist.styleOutputPath));

        gulp.src(allSrc, { sourcemaps: true })
            .pipe(concat(config.dev.scriptFileName))
            .pipe(gulp.dest(config.dist.scriptOutputPath));
    },
    min: function () {
        gulp.src(config.dist.scriptOutputPath + config.dev.scriptFileName)
            .pipe(minify())
            .pipe(gulp.dest(config.min.scriptOutputPath));

        gulp.src([
            config.dist.styleOutputPath + config.dev.styleFileName,
        ])
            .pipe(minify())
            .pipe(gulp.dest(config.dist.styleOutputPath));

        gulp.src(config.dist.styleOutputPath + config.dev.styleFileName)
            .pipe(csso())
            .pipe(gulp.dest(config.min.styleOutputPath));
    },
    renderIncludedList: function (fileMap) {
        var listFiles = '';
        for(var k in fileMap) {
            var url = fileMap[k];
            var item = ''+url+'';
            listFiles = listFiles + "\n" + item;
        }
        var listFilesDocBlock = '/**\nIncluded files:'+listFiles+'\n*/';
        return listFilesDocBlock;
    },
    vendor: function () {
        var listFilesDocBlock = build.renderIncludedList(vendorSrc);
        gulp.src(vendorSrc, { sourcemaps: true })
            .pipe(concat('vendor.js'))
            .pipe(replace(build.firstCharExp, listFilesDocBlock + '\n\n$1'))
            .pipe(gulp.dest(config.dev.scriptOutputPath));

        var listFilesDocBlockStyle = build.renderIncludedList(styleSrc);
        gulp.src(styleSrc)
            .pipe(concatCss('vendor.css'))
            .pipe(replace(build.firstCharExp,  listFilesDocBlockStyle + '\n\n$1'))
            .pipe(gulp.dest(config.dev.styleOutputPath));
    },
};

gulp.task('build', build.main);
gulp.task('build-min', build.min);
gulp.task('build-vendor', build.vendor);
gulp.task('clean', build.clean);

gulp.task('build-all', function() {

    build.clean();
    build.main();
    build.min();
    build.vendor();

});

gulp.task('renderScripts', function() {

    var html = '';
    for(var k in allSrc) {
        var url = allSrc[k];
        var item = '<script src="'+url+'"></script>';
        html = html + "\n" + item;
    }

    //console.log(html);

    gulp.src([config.src.path + '/index.html'])
        .pipe(replace('<!--SCRIPT_PLACEHOLDER-->', html))
        .pipe(gulp.dest('.'));

    //console(gulp.src('./dist/script/all.js').sourcemaps());

});
