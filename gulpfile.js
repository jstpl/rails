var gulp = require('gulp');
var build = require('./build/script/build');

gulp.task('clean', build.clean);
gulp.task('build-dev', build.dev);
gulp.task('build-prod', build.prod);
