var gulp = require('gulp');
var build = require('./build/script/build');

gulp.task('build', build.main);
gulp.task('build-min', build.min);
gulp.task('build-vendor', build.vendor);
gulp.task('build-page', build.page);
gulp.task('build-rails', build.rails);
gulp.task('clean', build.clean);

gulp.task('build-dev', build.dev);
gulp.task('build-prod', build.prod);

gulp.task('build-all', function() {

    //build.clean();
    build.main();
    build.min();
    build.vendor();

});
