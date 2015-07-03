'use strict';

var sourceMaps = require('gulp-sourcemaps'),
  cached = require('gulp-cached'),
  remember = require('gulp-remember'),
  ngAnnotate = require('gulp-ng-annotate'),
  ngFilesort = require('gulp-angular-filesort'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');


var scriptsFile = 'scripts.js';

module.exports = function(gulp, src, dest, sourceMapsPath) {
  gulp.task('scripts', function() {
    return gulp.src(src)
      .pipe(sourceMaps.init())
      .pipe(cached('scriptsCache'))
      .pipe(ngAnnotate())
      .pipe(ngFilesort())
      .pipe(remember('scriptsCache'))
      .pipe(concat(scriptsFile))
      .pipe(uglify())
      .pipe(sourceMaps.write(sourceMapsPath))
      .pipe(gulp.dest(dest));
  });
};

