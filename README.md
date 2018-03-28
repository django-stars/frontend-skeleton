
## Yet another boilerplate
React/Redux, Babel, Webpack, EcmaScript 2017.
Created for using in conjunction with Django.

## Usage

### Clone repo

```
git clone git@github.com:django-stars/frontend-skeleton.git
```

### Install dependencies

```
yarn install --ignore-optional
// (optional) if you need electron
// yarn add electron@^1.6
```

### Available commands
```
// run dev server
yarn start

// build bundles
yarn build

// run tests
yarn test
```

## Supports

* Webpack (build, watching, dev-server, livereload)
* Images compression (imagemin) (*need restore*)
* EcmaScript 2017
* Sass (~~sprites~~, sourcemaps)
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
* auto-watch new files
* built-in Notification Service
* built-in Abstract Controller with pagination/sorting/order features
* yeoman generator
