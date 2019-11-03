var gulp = require('gulp');
var clean = require('gulp-clean');
var src = require('../config/src');
var helper = require('../../node_modules/jrails/gulp/script/helper');
var builderTypeHelper = require('../../node_modules/jrails/gulp/script/builderTypeHelper');
var rjs = require('gulp-requirejs');
//var requireJs = require('requirejs');
var requirejs = require('requirejs');
var del = require('del');
//var config = require('../../build/config/distConfig');

var build = {

    dist: function () {
        var dir = './dist/assets';
        var promise = del(dir);
        promise.then(function () {
            var config = require('../../build/config/distConfig');
            rjs(config).pipe(gulp.dest('.'));

            builderTypeHelper.buildStyle(src.style.all, dir, 'built.css', true);
            // копируем нужные файлы
            builderTypeHelper.copy(['./src/app/root/*'], 'dist');

        });
    },

    dev: function () {
        var dir = './src/assets';
        var promise = del(dir);
        promise.then(function () {
            var config = require('../../build/config/devConfig');
            rjs(config).pipe(gulp.dest('.'));
            builderTypeHelper.buildStyle(src.style.all, dir, 'vendor.css', true);
        });
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

    deleteDev: function () {
        return builderTypeHelper.deleteDir('./src/assets');
    },

    // боевая сборка
    dist1111: function () {
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
