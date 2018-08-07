import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'


// load .env file
const config = dotenv.config({
  // dotenv use .env by default, but you can override this
  path: process.env.ENVFILE,
})

// load default config from .env.default
const configDefault = dotenv.config({
  path: '.env.default',
})

// expand variables
dotenvExpand(config)
dotenvExpand(configDefault)

export default process.env
