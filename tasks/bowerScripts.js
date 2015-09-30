'use strict';

var bowerFiles = require('main-bower-files'),
  gulpif = require('gulp-if'),
  debug = require('gulp-debug'),
  sourceMaps = require('gulp-sourcemaps'),
  newer = require('gulp-newer'),
  concat = require('gulp-concat'),
  rev = require('gulp-rev'),
  uglify = require('gulp-uglify'),
  _ = require('underscore');

var isFirstRun = true;
var vendorFile = 'vendor.js';
var jsFilter = {
  filter: /\.js$/i
};

module.exports = function(gulp, config) {
  var tasks = _.intersection(_.keys(gulp.tasks), ['bower:install', 'bower:prune']);
  gulp.task('bowerScripts', tasks, function() {
    var result = gulp.src(bowerFiles(jsFilter))
      .pipe(gulpif(config.build.bowerDebug, debug()))
      .pipe(sourceMaps.init())
      .pipe(gulpif(isFirstRun, newer(config.bowerScripts.dest + vendorFile)))
      .pipe(concat(vendorFile))
      .pipe(gulpif(config.build.uglify, uglify()))
      .pipe(gulpif(config.build.rev, rev()))
      .pipe(sourceMaps.write(config.build.sourceMapPath))
      .pipe(gulp.dest(config.bowerScripts.dest));

    isFirstRun = false;
    return result;
  });
};
