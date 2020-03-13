import dotenv from 'dotenv'
import packageConfig from './package.json'
import dotenvExpand from 'dotenv-expand'

if(!Boolean(process.env.APP_NAME)) {
  // set APP_NAME from package.json
  process.env.APP_NAME = packageConfig.name
}

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
