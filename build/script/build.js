var gulp = require('gulp');
var glob = require('glob');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var concatCss = require('gulp-concat-css');
var replace = require('gulp-replace');
var csso = require('gulp-csso');
var clean = require('gulp-clean');
var config = require('../config/config');
var src = require('../config/src');
var helper = require('./helper');

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
        gulp.src(src.style)
            .pipe(concatCss(config.dev.styleFileName))
            .pipe(gulp.dest(config.dist.styleOutputPath));

        gulp.src(src.all, { sourcemaps: true })
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
    page: function () {
        //var vendorList = helper.getFileList(src.vendor);
        var bundleList = helper.getFileList(src.bundle);
        var appList = helper.getFileList(src.app);
        var list = bundleList.concat(appList);

        list = helper.replaceInArray(list, './', '/');

        var code = helper.generateScriptTags(list);
        gulp.src([config.src.path + '/index.html'])
            .pipe(replace('<!--SCRIPT_PLACEHOLDER-->', code))
            .pipe(gulp.dest('.'));
    },
    vendor: function () {
        var listFilesDocBlock = helper.renderIncludedList(src.vendor);
        gulp.src(src.vendor, { sourcemaps: true })
            .pipe(concat('vendor.js'))
            .pipe(replace(build.firstCharExp, listFilesDocBlock + '\n\n$1'))
            .pipe(gulp.dest(config.dev.scriptOutputPath));

        var listFilesDocBlockStyle = helper.renderIncludedList(src.style);
        gulp.src(src.style)
            .pipe(concatCss('vendor.css'))
            .pipe(replace(build.firstCharExp,  listFilesDocBlockStyle + '\n\n$1'))
            .pipe(gulp.dest(config.dev.styleOutputPath));
    },
    rails: function () {
        //gulp.src(src.bundle, { sourcemaps: true }).glob();

        var listFilesDocBlock = helper.renderIncludedList(src.bundle);
        gulp.src(src.bundle, { sourcemaps: true })
            .pipe(concat('rails.js'))
            .pipe(replace(build.firstCharExp, listFilesDocBlock + '\n\n$1'))
            .pipe(gulp.dest(config.dev.scriptOutputPath));
    },
};

module.exports = build;


/*
var replace = require('gulp-replace');
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
*/
