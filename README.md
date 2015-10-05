
## Yet another boilerplate
AngularJS, Browserify, Gulp, EcmaScript 2015 (Babelify)

## Install

> this repository requires the [Compass ruby gem](http://compass-style.org/install/) in order to compile sass files

1. git clone git@github.com:django-stars/frontend-skeleton.git
2. npm install -g gulp
3. npm install
4. gulp

## Supports

* Gulp (build, watching)
* Simple static node server (express)
* Livereload
* Images compression (imagemin)
* CommonJS (browserify, sourcemaps, uglify)
* EcmaScript 2015 (ES6, babelify)
* ng-annotate (including [annotation for classes](https://github.com/mchmielarski/babel-plugin-ng-annotate))
* Jade
* Compass, sass (sprites, sourcemaps)
* Lodash
* re-usable components

## Running unit tests

We use [Jasmine](http://jasmine.github.io/) and [Karma](http://karma-runner.github.io/) for unit tests/specs.

- Start Karma with `gulp test-unit`
  - A browser will start and connect to the Karma server. PhantomJS is the default browser.
- Karma will sit and watch your application and test JavaScript files. To run or re-run tests just
  change any of your these files.

## Running end to end tests

We use [Jasmine](http://jasmine.github.io/) and [Protractor](https://angular.github.io/protractor/) for end-to-end testing.

Requires a webserver that serves the application.

- Run application via `gulp`
- In a separate console run the end2end tests: `gulp test-e2e`.

## Details

Angular styleguide: https://github.com/johnpapa/angular-styleguide

## TODO

* Bootstrap or Polymer?
* PageTitle service
* built-in Auth Service/Module
* include RestAngular ?
* Service that allow provide fake data for resources (for test)
* more examples
* tests directory
