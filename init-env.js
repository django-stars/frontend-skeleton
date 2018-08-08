import dotenv from 'dotenv'
// import dotenvExpand from 'dotenv-expand'


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


// dotenv-expand overrides falsy values in process.env
// https://github.com/motdotla/dotenv-expand/pull/17/files
function dotenvExpand(config) {
  var interpolate = function(env) {
    var matches = env.match(/\$([a-zA-Z0-9_]+)|\${([a-zA-Z0-9_]+)}/g) || []

    matches.forEach(function(match) {
      var key = match.replace(/\$|{|}/g, '')

      // process.env value 'wins' over .env file's value
      var variable = process.env.hasOwnProperty(key) ? process.env[key] : (config.parsed[key] || '')

      // Resolve recursive interpolations
      variable = interpolate(variable)

      env = env.replace(match, variable)
    })

    return env
  }

  for(var configKey in config.parsed) {
    var value = process.env.hasOwnProperty(configKey) ? process.env[configKey] : config.parsed[configKey]

    if(config.parsed[configKey].substring(0, 2) === '\\$') {
      config.parsed[configKey] = value.substring(1)
    } else if(config.parsed[configKey].indexOf('\\$') > 0) {
      config.parsed[configKey] = value.replace(/\\\$/g, '$')
    } else {
      config.parsed[configKey] = interpolate(value)
    }
  }

  for(var processKey in config.parsed) {
    process.env[processKey] = config.parsed[processKey]
  }

  return config
}
