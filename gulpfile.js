var gulp = require('gulp');
var build = require('./gulp/script/build');

gulp.task('clean', build.clean);
gulp.task('build-dev', build.dev);
gulp.task('build-prod', build.prod);
gulp.task('build-rails', build.rails);
gulp.task('build-dev-style', build.devStyle);
//gulp.task('build-dist-style', build.distStyle);
gulp.task('build-dist-build', build.dist);
gulp.task('build-dist-delete', build.deleteDist);
gulp.task('build-dist-rjs', build.devRjs);
