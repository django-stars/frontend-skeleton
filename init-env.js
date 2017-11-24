import dotenv from 'dotenv'

dotenv.config({
  // dotenv use .env by default, but you can override this
  path: process.env.ENVFILE,
})

// load default config from .env.example
dotenv.config({
  // dotenv use .env by default, but you can override this
  path: '.env.default',
})

/*
const defaults = {
  BACKEND_URL: 'http://localhost:8000',
  API_URL: '/api/v1/',
  SOURCES_PATH: 'src',
  OUTPUT_PATH: 'dist',
  PUBLIC_PATH: 'assets',
  DEV_SERVER_PORT: 3000,
  AUTH_HEADER: 'Authorization',
  PROXY: ['/static/', '/media/'],
  ENABLE_META: false,
}

Object.keys(defaults).forEach(function (key) {
  if (!process.env.hasOwnProperty(key)) {
    process.env[key] = defaults[key]
  }
})
*/

export default process.env
