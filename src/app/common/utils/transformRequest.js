import axios from 'axios'
import keys from 'lodash/keys'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import isPlainObject from 'lodash/isPlainObject'
import isObject from 'lodash/isObject'
import flatMapDeep from 'lodash/flatMapDeep'

axios.interceptors.request.use(function(config) {
  if(config.method !== 'get') {
    config.data = transformRequest(config.data)
    config.headers = {
      ...config.headers,
      'Content-Type': config.data instanceof FormData ? 'application/x-www-form-urlencoded' : 'application/json',
    }
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

function transformRequest(body) {
  const isMultipartFormData = hasFile(body)
  if(isPlainObject(body)) {
    // FIXME we shouldn't send file object represented by url
    ['avatar', 'logo', 'file'].forEach(field => isString(body[field]) && delete body[field])
  }
  if(isMultipartFormData) {
    const formData = new FormData()

    for(var name in body) {
      if(isFunction(body[name])) {
        // FIXME there should not be functions
        console.warn('API detects invalid data value (function) in field:', name)
        continue
      } else if(Array.isArray(body[name])) {
        body[name].forEach((value, i) => {
          if(isObject(value)) {
            keys(value).forEach(key => {
              formData.append(`${name}[${i}]${key}`, value[key])
            })
          } else {
            formData.append(name, value)
          }
        })
      } else if(isPlainObject(body[name])) {
        keys(body[name]).forEach(key => {
          formData.append(`${name}.${key}`, body[name][key])
        })
      }
    }
    return formData
  } else {
    return JSON.stringify(body)
  }
}

function deepValues(obj) {
  // creates flat list of all `obj` values (including nested)
  if(isPlainObject(obj) || Array.isArray(obj)) {
    return flatMapDeep(obj, deepValues)
  }
  return obj
}

function hasFile(obj) {
  return deepValues(obj).some((v) => v instanceof File)
}
