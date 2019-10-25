var gulp = require('gulp');
var clean = require('gulp-clean');
var src = require('../config/src');
var helper = require('../../node_modules/jrails/gulp/script/helper');
var builderTypeHelper = require('../../node_modules/jrails/gulp/script/builderTypeHelper');

var build = {

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
        builderTypeHelper.buildStyle(src.style.all, './dist/assets/style', 'build.css', true);
        builderTypeHelper.buildScript(src.script.all, './dist/assets/script', 'build.js', true);

        var scriptList = ['assets/script/build-min.js'];
        var styleList = ['assets/style/build.css'];

        scriptList = helper.replaceInArray(scriptList, '/src/', '/');
        styleList = helper.replaceInArray(styleList, '/src/', '/');

        builderTypeHelper.buildPage(scriptList, styleList, './dist');
    },

    /**
     * Собираем проект для разработки
     * 
     * Шаги:
     * - собираем стили в разные файлы (вендоры, рельсы)
     * - собираем скрипты в разные файлы (вендоры, рельсы)
     */
    dev: function () {
        builderTypeHelper.buildStyle(src.style.all, './src/assets/style', 'vendor.css');
        builderTypeHelper.buildScript(src.script.vendor, './src/assets/script', 'vendor.js');
        builderTypeHelper.buildScript(src.script.rails, './src/assets/script', 'rails.js');

        var vendorScriptList = ['./src/assets/script/vendor.js'];
        var bundleScriptList = helper.getFileList(src.script.rails);
        var appScriptList = helper.getFileList(src.script.app);
        var scriptList = vendorScriptList.concat(bundleScriptList.concat(appScriptList));
        var styleList = ['./src/assets/style/vendor.css'];
        builderTypeHelper.buildPage(scriptList, styleList, '.');
    },

    /**
     * Собираем рельсы
     *
     * Шаги:
     * - собираем стили отдельно
     * - собираем скрипты отдельно
     */
    rails: function () {
        builderTypeHelper.buildScript(src.script.rails, './src/assets/script', 'rails.js', true);
    },

    clean: function () {
        return gulp.src([
            './src/assets',
            './dist',
        ], {read: false})
            .pipe(clean());
    },
};

module.exports = build;
