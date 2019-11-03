var gulp = require('gulp');
var clean = require('gulp-clean');
var src = require('../config/src');
var helper = require('../../node_modules/jrails/gulp/script/helper');
var builderTypeHelper = require('../../node_modules/jrails/gulp/script/builderTypeHelper');
var rjs = require('gulp-requirejs');
//var requireJs = require('requirejs');
var requirejs = require('requirejs');
//var config = require('../../build/config/distConfig');

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

        var data = {
            scriptList: ['assets/script/build-min.js'],
            styleList: ['assets/style/build.css']
        };
        data.scriptList = helper.replaceInArray(data.scriptList, '/src/', '/');
        data.styleList = helper.replaceInArray(data.styleList, '/src/', '/');

        builderTypeHelper.buildPage(data, './dist');
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
        builderTypeHelper.buildScript(src.script.vendor, './src/script', 'vendor.js');
        builderTypeHelper.buildScript(src.script.rails, './src/script', 'rails.js');

        var vendorScriptList = ['./src/assets/vendor.js'];
        var bundleScriptList = helper.getFileList(src.script.rails);
        var appScriptList = helper.getFileList(src.script.app);
        var data = {};
        data.scriptList = vendorScriptList.concat(bundleScriptList.concat(appScriptList));
        data.styleList = ['./src/assets/style/vendor.css'];
        builderTypeHelper.buildPage(data, '.');
    },

    devRjs: function () {
        var config = {
            baseUrl: "src",
            name: "app/index",
            out: "./dist/assets/built.js",
            writeBuildTxt: true,
            paths: {
                module: 'module',
                widget: 'widget',
                app: '../app',
                jrails: '../../node_modules/jrails/src',
                DirectorRouter: '../../node_modules/director/build/director.min',
                lodash: '../../node_modules/lodash/lodash.min',
                jquery: '../../node_modules/jquery/dist/jquery.min',
                text: '../../node_modules/text/text',
                twitterBootstrap: '../../node_modules/bootstrap/dist/js/bootstrap.min',
                //redux: '../../node_modules/redux/dist/redux.min',
                vue: '../../node_modules/vue/dist/vue.min',
                //toastr: '../../node_modules/toastr/build/toastr.min',
                toastr: '../app/toastr',
                jqueryUi: '../../node_modules/jquery-ui/jquery-ui.min',
                //templates: '../app/view',
            },
            include: [
                '../../node_modules/requirejs/require',
                //'../../node_modules/toastr/build/toastr.min',
            ],
            //cssIn: "path/to/main.css",
            //out: "path/to/css-optimized.css",
            shim: {
                'DirectorRouter': {
                    exports: 'Router'
                },
                'lodash': {
                    exports: '_'
                },
                'jquery': {
                    exports: '$'
                },
                "jqueryUi": {
                    exports: "$",
                    deps: ['jquery']
                },
                "twitterBootstrap": {
                    deps: ["jquery"]
                },
                'toastr': {
                    exports: 'toastr',
                    deps: ["jquery"]
                },
                'vue': {
                    exports: 'Vue'
                },
            }
        };

        config = {
            //out: './rrrrrrrrrrrrrrrrrrr',
            name: "app/config/requirejs",
            // src/app/config/requirejs.js
        };

        //requireJs.optimize(config);

        //return;

        return rjs(["app/config/requirejs"]).pipe(gulp.dest('./dist/')); // pipe it to the output DIR
    },

    // сборка стилей для разработки
    devStyle: function () {
        builderTypeHelper.buildStyle(src.style.all, './src/assets', 'vendor.css', true);
    },

    /*distStyle: function () {
        builderTypeHelper.buildStyle(src.style.all, './dist/assets', 'built.css', true);
        builderTypeHelper.copy(['./src/app/root/!*'], 'dist');
    },*/

    // удаление боевой сбоорки (нужно для пересборки)
    deleteDist: function () {
        return builderTypeHelper.deleteDir('./dist');
    },

    // боевая сборка
    dist: function () {
        /*config.baseUrl = '../../..';
        requirejs.optimize( config, function(results) {
            console.log(results);
        });*/

        // собираем стили вендоров
        builderTypeHelper.buildStyle(src.style.all, './dist/assets', 'built.css', true);
        // копируем нужные файлы
        builderTypeHelper.copy(['./src/app/root/*'], 'dist');
    },

    /**
     * Собираем рельсы
     *
     * Шаги:
     * - собираем стили отдельно
     * - собираем скрипты отдельно
     */
    rails: function () {
        builderTypeHelper.buildScript(src.script.rails, './src/assets', 'rails.js', true);
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
