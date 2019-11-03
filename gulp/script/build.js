var gulp = require('gulp');
var src = require('../config/src');
var builderTypeHelper = require('../../node_modules/jrails/gulp/script/builderTypeHelper');
var rjs = require('gulp-requirejs');
var del = require('del');

module.exports = {

    dist: function () {
        var dir = './dist/assets';
        // удаление сбоорки (нужно для пересборки)
        var promise = del(dir);
        promise.then(function () {
            var config = require('../../build/config/distConfig');
            rjs(config).pipe(gulp.dest('.'));
            // сборка стилей для боя
            builderTypeHelper.buildStyle(src.style.all, dir, 'built.css', true);
            // копируем нужные файлы
            builderTypeHelper.copy(['./src/root/*'], 'dist');
        });
    },

    dev: function () {
        var dir = './src/assets';
        // удаление сбоорки (нужно для пересборки)
        var promise = del(dir);
        promise.then(function () {
            var config = require('../../build/config/devConfig');
            rjs(config).pipe(gulp.dest('.'));
            // сборка стилей для разработки
            builderTypeHelper.buildStyle(src.style.all, dir, 'vendor.css', true);
        });
    },

};
