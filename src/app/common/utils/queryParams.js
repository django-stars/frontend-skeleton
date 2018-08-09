import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'
import isEmpty from 'lodash/isEmpty'

const convertValueFor = ['ordering']

export function parseQueryParams(str) {
  if(str.length <= 2) {
    return {} // '' || '?'
  }

  return str
    .substr(1) // symbol '?'
    .split('&')
    .reduce(function(params, param) {
      var paramSplit = param.split('=').map(function(chunk) {
        return decodeURIComponent(chunk.replace('+', '%20'))
      })
      const name = camelCaseParam(paramSplit[0])
      let value = paramSplit[1]
      if(convertValueFor.includes(name)) {
        value = camelCaseParam(value)
      }
      params[name] = params.hasOwnProperty(name) ? [].concat(params[name], value) : value
      return params
    }, {})
}

export function buildQueryParams(params) {
  if(isEmpty(params)) {
    return ''
  }

  return Object.keys(params).reduce(function(ret, key) {
    let value = params[key]

    if(value === null || value === undefined) {
      return ret
    }

    if(!Array.isArray(value)) {
      value = [value]
    }

    value.forEach(function(val) {
      if(String(val).length > 0) {
        let _key = snakeCaseParam(key)
        if(convertValueFor.includes(_key)) {
          val = snakeCaseParam(val)
        }

        ret.push(
          encodeURIComponent(_key) +
          '=' +
          encodeURIComponent(val)
        )
      }
    })
    // TODO null should not be here, check field components

    return ret
  }, []).join('&')
}

export function camelCaseParam(name) {
  let parts = name.split('__')
  name = camelCase(parts.shift())

  if(parts.length === 0) {
    return name
  }

  return `${name}[${parts.join('][')}]`
}

export function snakeCaseParam(name) {
  let parts = name.split('[')
  name = snakeCase(parts.shift())

  if(parts.length === 0) {
    return name
  }

  return `${name}__${parts.join('__').replace(/\]/g, '')}`
}

function orderingEnhancer(func) {
  return function(name) {
    let prefix = ''

    if(/^-\w/.test(name)) {
      prefix = '-'
      name = name.substr(1)
    }

    return prefix + func(name)
  }
}

camelCaseParam = orderingEnhancer(camelCaseParam) // eslint-disable-line no-func-assign
snakeCaseParam = orderingEnhancer(snakeCaseParam) // eslint-disable-line no-func-assign
