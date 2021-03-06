<img align="right" src="gulp-modular.png">

# gulp-modular [![npm version](https://badge.fury.io/js/gulp-modular.svg)](https://badge.fury.io/js/gulp-modular)

Boilerplate gulp tasks for quick project setup.

## What is gulp-modular?
 We were tired of creating and customizing more and more gulpfiles for every new project. 
We decided to create gulp-modular, a collection of gulp tasks for a quick project setup. 
gulp-modular ships with a bunch of pre-defined and pre-configured tasks without loosing the flexibility to refine, 
replace or extend the tasks to suit your individual needs. We currently aim at Web Apps utilizing AngularJS 1.x. 
However, we are happy to extend gulp-modular to incorporate specifics of other frameworks and libraries. 
Just submit an issue or even better a PR :) 

## Installation
`npm install gulp gulp-modular --save-dev`

## Setup
Copy `sample-gulpfile.js` from the gulp-modular root to your project and rename it to `gulpfile.js`. 
Open the file and customize the tasks to match your specific project requirements. 

```javascript
// 1) loading gulp and gup-modular
var gulp = require('gulp');
var modular = require('gulp-modular');

// 2) define the gulp-modular configuration 
var config = {...};

// 3) pass gulp and configuration to gulp-modular
modular(gulp, config);
```

## Configuration
Check the [DOCUMENTATION](DOCUMENTATION.md) for all pre-defined tasks and their configuration options.

## Extending, Decorating, Replacing
Optionally decorate, replace or extend gulp tasks via the usual gulp API.

```javascript
// Optionally decorate gulp tasks
var stylesTask = gulp.tasks['styles']; // decorate: wrap `stylesTask` and re-assign (cf. replace)

// Optionally extend/replace gulp tasks
gulp.task('styles', changedDependencies, function() { // replace entire task and/or change dependencies
  // e.g. define your stylus or less pipeline
});
```

## Examples
We use gulp-modular in different private projects. However, a few public examples exist which may help you to set up gulp-modular for your project:

* [angular-sample-app](https://github.com/maxklenk/angular-sample-app/blob/master/gulpfile.js) 
* [graFiddle](https://github.com/GraFiddle/grafiddle/blob/develop/gulpfile.js)
