import camelCase from 'lodash/camelCase'
import snakeCase from 'lodash/snakeCase'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

const convertValueFor = ['ordering']
const arrayQueries = ['asset_class', 'strategy', 'region', 'market', 'status']

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
      const name = paramSplit[0]
      let value = paramSplit[1]
      if(convertValueFor.includes(name)) {
        value = camelCaseParam(value)
      }
      if(arrayQueries.includes(name)) {
        value = [...get(params, name, []), value]
      }
      params[name] = value
      return params
    }, {})
}

export function buildQueryParams(params) {
  if(isEmpty(params)) {
    return ''
  }

  return Object.keys(params).reduce(function(ret, key) {
    let value = params[key]

    // TODO null should not be here, check field components
    if(value !== null && value !== undefined && String(value).length > 0) {
      if(arrayQueries.includes(key)) {
        value.forEach(val => {
          ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(val))
        })
      } else {
        if(convertValueFor.includes(key)) {
          value = snakeCaseParam(value)
        }
        if(value === false) { return ret }

        ret.push(
          encodeURIComponent(key) +
          '=' +
          encodeURIComponent(value)
        )
      }
    }
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

export const camelCaseParamStringify = orderingEnhancer(camelCaseParam)
export const snakeCaseParamStringify = orderingEnhancer(snakeCaseParam)
