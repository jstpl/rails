var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var concatCss = require('gulp-concat-css');
var replace = require('gulp-replace');
var csso = require('gulp-csso');
var clean = require('gulp-clean');
var config = require('../../config/config');
var src = require('../../config/src');

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
        var listFilesDocBlock = build.renderIncludedList(src.vendor);
        gulp.src(src.vendor, { sourcemaps: true })
            .pipe(concat('vendor.js'))
            .pipe(replace(build.firstCharExp, listFilesDocBlock + '\n\n$1'))
            .pipe(gulp.dest(config.dev.scriptOutputPath));

        var listFilesDocBlockStyle = build.renderIncludedList(src.style);
        gulp.src(src.style)
            .pipe(concatCss('vendor.css'))
            .pipe(replace(build.firstCharExp,  listFilesDocBlockStyle + '\n\n$1'))
            .pipe(gulp.dest(config.dev.styleOutputPath));
    },
};

module.exports = build;
