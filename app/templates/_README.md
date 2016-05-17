# <%= appName %>

## Install

1. npm install
2. cp local.default.json local.json
3. gulp

## Run

Make sure your python environment is running, and then run gulp.
```
gulp
```

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
