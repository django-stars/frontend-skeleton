const { readFile } = require('fs')
const path = require('path')
const querystring = require('querystring')


module.exports = function getContent(url, options = {}) {
  console.info('[req][SSR] get content for: %s', url)
  let render

  try {
    render = require('../../dist/ssr/ssr').render
  } catch(e) {
    console.error('[e][SSR] runtime ⬇️')
    console.error(e)
    return Promise.reject(e)
  }

  return new Promise((resolve, reject) => {
    render(url, options)
      .then(function({ html, css, state, helmet, routerContext }) {
        console.log('[res][SSR]', { html, css, state, routerContext })
        state = Buffer.from(querystring.escape(JSON.stringify(state))).toString('base64')

        return new Promise((resolve, reject) => {
          // FIXME ugly paths
          readFile(path.resolve(__dirname, '../../dist/index.html'), 'utf8', function(err, contents) {
            if(err) {
              console.error('Error reading ssr bundle', err)
              reject(err)
            } else {
              // handle 404 more SEO-friendly
              if(routerContext.url === '/404') {
                reject({ status: 404, type: 'redirect', message: 'Not found' })
              }
              resolve({
                redirect: routerContext.url,
                // TODO templating
                content: contents
                  .split('<div id="root"></div>').join(`<div id="root">${html}</div>`)
                  .split('</head>').join(`${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}<style>${css}</style></head>`)
                  .split('<html ').join(`<html ${helmet.htmlAttributes.toString()} `)
                  .split('<body ').join(`<body ${helmet.bodyAttributes.toString()} `)
                  .split('<div id="root"').join(`<div id="root" data-initial-state="${state}"`),
              })
            }
          })
        })
      })
      .then(resolve)
      .catch(err => {
        if(err && err.status && err.status === 404) {
          // handle 404 more SEO-friendly
          resolve(
            getContent('/404', options)
              // omit redirect for SEO needs
              .then(({ content }) => ({ content, status: 404 }))
          )
        } else {
          reject(err)
        }
      })
  })
}
