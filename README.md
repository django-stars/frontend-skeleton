## Yet another yeoman generator
AngularJS, Browserify, Gulp, EcmaScript 2015 (Babelify).
Created for using in conjunction with Django.

## Usage

Install `yo`, `generator-telega-frontend`:
```
npm install -g yo generator-telega-frontend
```

For using Sass, you will need to install Ruby and Compass:
- Install Ruby by downloading from [here](http://rubyinstaller.org/downloads/) or use Homebrew
- Install the compass gem:
```
gem install compass
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo telega-frontend`

Run `gulp` for preview


## Supports

* Gulp (build, watching)
* Simple static node server (express)
* Livereload
* Images compression (imagemin)
* CommonJS (browserify, sourcemaps, uglify)
* EcmaScript 2015 (ES6, babelify)
* ng-annotate (including [annotation for classes](https://github.com/mchmielarski/babel-plugin-ng-annotate))
* Pug (Jade)
* Compass, sass (sprites, sourcemaps)
* Lodash
* re-usable components

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
