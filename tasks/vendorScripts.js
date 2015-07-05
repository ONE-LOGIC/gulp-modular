'use strict';

var bowerFiles = require('main-bower-files'),
  gulpif = require('gulp-if'),
  debug = require('gulp-debug'),
  sourceMaps = require('gulp-sourcemaps'),
  newer = require('gulp-newer'),
  concat = require('gulp-concat'),
  rev = require('gulp-rev'),
  uglify = require('gulp-uglify');


var isFirstRun = true;
var vendorFile = 'vendor.js';
var jsFilter = {
  filter: /\.js$/i
};

module.exports = function(gulp, dest, sourceMapPath, debugFlag, revFlag) {
  gulp.task('vendorScripts', ['bower:install', 'bower:prune'], function() {
    var result = gulp.src(bowerFiles(jsFilter))
      .pipe(gulpif(debugFlag, debug()))
      .pipe(sourceMaps.init())
      .pipe(gulpif(isFirstRun, newer(dest + vendorFile)))
      .pipe(concat(vendorFile))
      .pipe(uglify())
      .pipe(gulpif(revFlag, rev()))
      .pipe(sourceMaps.write(sourceMapPath))
      .pipe(gulp.dest(dest));

    isFirstRun = false;
    return result;
  });
};
