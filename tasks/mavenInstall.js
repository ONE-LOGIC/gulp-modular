'use strict';

var maven = require('gulp-maven-deploy');


module.exports = function(gulp, config) {
  gulp.task('maven-install', ['build'], function() {
    gulp.src('.')
      .pipe(maven.install({
        config: config
      }));
  });
};
