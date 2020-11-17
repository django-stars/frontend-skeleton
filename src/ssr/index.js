const express = require('express')
const getContent = require('./get-content')
const path = require('path')
const proxy = require('http-proxy-middleware')


const app = express()

app.disable('x-powered-by')
app.listen(4000, '0.0.0.0')

// serving static files
app.use('/assets', express.static(path.resolve(__dirname, '../../dist/assets')))

app.use(
  '/api/v1/',
  proxy({
    target: 'http://space11.inprogress.rocks',
    changeOrigin: true,
    secure: false,
    router: {
      'localhost:4000': 'https://space11.inprogress.rocks',
    },
  })
)

// server rendered home page
app.get('*', (req, res) => {
  let acceptLanguage = req.headers['accept-language'].split('-')[0]
  let origin = req.protocol + '://' + req.get('host')

  getContent(req.url, { acceptLanguage, origin })
    .then(function({ content, redirect, status }) {
      console.log('res')
      console.log(status)
      console.log(redirect)
      console.log(content)
      if(status) {
        res.status(status)
      }
      if(redirect) {
        res.redirect(301, redirect)
      }
      res.send(content)
    })
    .catch(function(e) {
      console.log('catch')
      console.log(e)
      if(e && e.type && e.type === 'redirect') {
        res.status(e.status).send(e.message)
      } else {
        res.status(500).send('Internal server error.')
        console.error(e)
      }
    })
})
