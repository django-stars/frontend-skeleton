
## Install

> this repository requires the compass ruby gem in order to compile compass.

1. git clone git@github.com:django-stars/frontend-skeleton.git
2. git remote add upstream git@github.com:[user-name]/[project-repo].git
3. git remote set-url origin git@github.com:[user-name]/[your-fork-repo].git
4. git branch -u origin/master master
5. npm install -g gulp
6. npm install
7. gulp

## Supports

* Gulp (build, watching)
* Simple static node server (express)
* Livereload
* Images compression (imagemin)
* CommonJS (browserify, sourcemaps, uglify)
* EcmaScript 2015 (ES6, babelify, jsx)
* Jade
* Compass, sass (sprites, sourcemaps)
* Lodash
* re-usable components

## Running unit tests

We use [Jasmine][jasmine] and [Karma][karma] for unit tests/specs.

- Start Karma with `gulp spec`
  - A browser will start and connect to the Karma server. PhantomJS is the default browser.
- Karma will sit and watch your application and test JavaScript files. To run or re-run tests just
  change any of your these files.
  
## Running end to end tests

We use [Jasmine][jasmine] and [Protractor][protractor] for end-to-end testing.

Requires a webserver that serves the application. 

- In a separate console run `webdriver-manager start --standalone`.
- In a separate console run the end2end tests: `gulp e2e`.

## Details

Angular styleguide: https://github.com/johnpapa/angular-styleguide

## TODO

* bootstrap or polymer?
* tests, karma

## Are we need this?

* coffee
* modernizer
