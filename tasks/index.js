'use strict';

var extend = require('extend'),
  gulpInject = require('gulp-inject'),
  minifyInline = require('gulp-minify-inline'),
  minifyHtml = require('gulp-minify-html'),
  preprocess = require('gulp-preprocess'),
  gulpif = require('gulp-if'),
  _ = require('underscore');

module.exports = function(gulp, config) {
  function injectIndex() {
    // don't read, just insert paths
    var srcOptions = {
      cwd: config.build.dest,
      read: false
    };

    var jsFiles = ['js/vendor*.js', 'js/scripts*.js'];
    var cssFiles = ['css/vendor*.css', 'css/style*.css'];

    // use relative paths with dist as base; remove the prepended '../dist' in the path
    var injectOptions = {
      relative: true,
      ignorePath: '../' + config.build.dest,
      addPrefix: config.build.cdn
    };

    return gulp.src(config.build.index)
      .pipe(gulpInject(gulp.src(cssFiles, srcOptions), injectOptions))
      .pipe(gulpInject(gulp.src(jsFiles, srcOptions), extend({}, injectOptions)))
      .pipe(gulpif(config.preprocess && config.preprocess.apply.index, preprocess(config.preprocess)))
      .pipe(minifyInline())
      .pipe(minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe(gulp.dest(config.build.dest));
  }

  // use this for watch
  gulp.task('justIndex', injectIndex);

  // use this initial building
  var tasks = _.intersection(_.keys(gulp.tasks), ['scripts', 'bowerScripts', 'styles', 'bowerStyles', 'bowerFonts']);
  gulp.task('index', tasks, injectIndex);
};
