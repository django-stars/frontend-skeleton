import { Observable } from 'rxjs/Rx'
import { SubmissionError } from 'redux-form'
import keys from 'lodash/keys'

var store

// FIXME make it as middleware
export function configure(s) { store = s }

export default function(endpoint) {
  return new API(endpoint)
}

class API {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  request(method = 'GET', data = {}/*, options*/) {
    const authToken = store.getState().session.token;
    const Authorization = authToken ? 'JWT ' + authToken : '';

    return Observable.from(
      fetch(
        `/api/v1/${this.endpoint}/`,
        {
          method,
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization
          }
        }
      )
      .then(response => {
        const data = response.json()
        if(response.ok) {
          return data;
        }

        // handle errors
        var errors = {};
        keys(data).forEach( key => {
          let eKey = key
          if(key == 'non_field_errors' || key == 'detail') {
            eKey = '_error'
          }
          if(Array.isArray(body[key])) {
            errors[eKey] = body[key][0];
          } else {
            errors[eKey] = body[key];
          }
        })

        throw new SubmissionError(errors)
      })
    )
  }

  post(data) {
    return this.request('POST', data)
  }

  get() {
    return this.request()
  }

  // TODO
  //patch
  //put
  //delete
}
