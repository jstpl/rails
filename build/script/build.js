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

var builder = {
    buildScript: function (sourceMap, targetDest, targetFileName, isMinify) {
        var listFilesDocBlockRails = helper.renderIncludedList(sourceMap);
        var gulp1 = gulp.src(sourceMap, { sourcemaps: true })
            .pipe(concat(targetFileName))
            .pipe(replace(build.firstCharExp, listFilesDocBlockRails + '\n\n$1'));
        if(isMinify === true) {
            gulp1 = gulp1.pipe(minify());
        }
        gulp1.pipe(gulp.dest(targetDest));
    },
    buildStyle: function (sourceMap, targetDest, targetFileName, isMinify) {
        var listFilesDocBlockStyle = helper.renderIncludedList(sourceMap);
        var gulp1 = gulp.src(sourceMap)
            .pipe(concatCss(targetFileName))
            .pipe(replace(build.firstCharExp, listFilesDocBlockStyle + '\n\n$1'));
        if(isMinify === true) {
            gulp1 = gulp1
                .pipe(csso())
                .pipe(minify());
        }
        gulp1.pipe(gulp.dest(targetDest));
    },
    buildPage: function (jsList, cssList) {
        /*var vendorList = ['./src/vendor/vendor.js'];
        var bundleList = helper.getFileList(src.bundle);
        var appList = helper.getFileList(src.app);
        var list = vendorList.concat(bundleList.concat(appList));*/

        jsList = helper.replaceInArray(jsList, './', '/');
        var style = helper.generateStyleTags(cssList);
        var code = helper.generateScriptTags(jsList);
        gulp.src([config.src.path + '/index.html'])
            .pipe(replace('<!--SCRIPT_PLACEHOLDER-->', code))
            .pipe(replace('<!--STYLE_PLACEHOLDER-->', style))
            .pipe(gulp.dest('.'));
    },
};

var build = {
    firstCharExp: /^([\s\S]{1})/g,

    /**
     * Собираем проект для продакшн
     * 
     * Шаги:
     * - собираем стили
     * - собираем скрипты
     * - собираем шаблоны
     * - мнифицируем
     */
    prod: function () {
        builder.buildStyle(src.style, './dist/assets/style', 'build.css', true);
        builder.buildScript(src.all, './dist/assets/script', 'build.js', true);
    },

    /**
     * Собираем проект для разработки
     * 
     * Шаги:
     * - собираем стили в разные файлы (вендоры, рельсы)
     * - собираем скрипты в разные файлы (вендоры, рельсы)
     */
    dev: function () {
        builder.buildStyle(src.style, './src/assets/style', 'vendor.css');
        builder.buildScript(src.vendor, './src/assets/script', 'vendor.js');
        //builder.buildScript(src.bundle, './src/assets/script', 'rails.js');

        var vendorList = ['./src/assets/script/vendor.js'];
        var bundleList = helper.getFileList(src.bundle);
        var appList = helper.getFileList(src.app);
        var jsList = vendorList.concat(bundleList.concat(appList));
        var cssList = ['./src/assets/style/vendor.css'];
        builder.buildPage(jsList, cssList);
    },
    
    
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
        var vendorList = ['./src/vendor/vendor.js'];
        var bundleList = helper.getFileList(src.bundle);
        var appList = helper.getFileList(src.app);
        var list = vendorList.concat(bundleList.concat(appList));

        list = helper.replaceInArray(list, './', '/');

        var style = helper.generateStyleTags(['./src/vendor/vendor.css']);

        var code = helper.generateScriptTags(list);
        gulp.src([config.src.path + '/index.html'])
            .pipe(replace('<!--SCRIPT_PLACEHOLDER-->', code))
            .pipe(replace('<!--STYLE_PLACEHOLDER-->', style))
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
        var listFilesDocBlock = helper.renderIncludedList(src.bundle);
        gulp.src(src.bundle, { sourcemaps: true })
            .pipe(concat('rails.js'))
            .pipe(replace(build.firstCharExp, listFilesDocBlock + '\n\n$1'))
            .pipe(gulp.dest(config.dev.scriptOutputPath));
    },
};

module.exports = build;
