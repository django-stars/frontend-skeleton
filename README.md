![dependencies status](https://david-dm.org/django-stars/frontend-skeleton/status.svg)
![devDependencies status](https://david-dm.org/django-stars/frontend-skeleton/dev-status.svg)

## Summary

Boilerplate for fast start frontend project with React/Redux, Babel, Webpack, Sass/Postcss and more other

## Supports

- SPA and MPA/SSR applications
- Proxy API and templates to different backends
- Multiple domains
- Configuration via .env file or environment
- Includes lot of code samples (react application)
- Spliting vendor and app bundles
- SVG icons via postcss-inline-svg
- HMR of course
- Sass, Postcss, Bootstrap, React, Redux
- Linter via ESLint
- Tests via Jest/Enzyme
- Easy webpack configuration via webpack-blocks

## Usage

#### Requirements
- node ^8.9.0
- npm ^5.0.3
- yarn ^1.13.0

### Start

```
// 1. clone repo
git clone git@github.com:django-stars/frontend-skeleton.git

// 2. rename project folder and remove `.git` folder
mv frontend-skeleton <my-project-name>
cd <my-project-name>
rm -rf .git

// 3. install dependencies and start
yarn install
yarn start

// 4. open http://localhost:3000
```

### Available commands

```
// run dev server
yarn start

// build bundles
yarn build

// run tests
yarn test

// check app source with linter
yarn lint

// fix app source with linter
yarn lint:fix

```

### Available options

[.env.default](.env.default)

please do not modify `.env.default` file. you can create `.env` file near `.env.default` and rewrite options that you need

## Recipes


#### jQuery

```
  addPlugins([
    new webpack.ProvidePlugin({
      'jQuery': 'jquery'
    }),
  ]),
```

#### enable linter verbose log

run linter manually

```
DEBUG=eslint:cli-engine node linter
```

more information here: https://github.com/eslint/eslint/issues/1101

#### Custom env variables in application code
you need add it to `setEnv` in `webpack.config`

#### get access to env inside index.html

you can use lodash templates
```
  <%=htmlWebpackPlugin.options.env.GA_TRACKING_ID%>')
  <%=htmlWebpackPlugin.options.env.NODE_ENV%>')
```

#### GA traking page changes in SPA
```
if(process.env.NODE_ENV === 'production') {
  history.listen(function (location) {
    window.gtag('config', process.env.GA_TRACKING_ID, {'page_path': location.pathname + location.search});
  })
}
```
