import { push, LOCATION_CHANGE } from 'react-router-redux'
import { of } from 'rxjs/observable/of'
import 'rxjs/add/operator/takeUntil'

import { namedRoutes } from 'routes'

const navigateAssync = 'routes/NAVIGATE_ASSYNC'

export default function navigateAfter(name, actionType, state) {
  let path = namedRoutes[name]
  if(!path) {
    throw new Error('no route with name: ' + name)
  }

  return {
    type: navigateAssync,
    payload: {
      path,
      actionType,
      state,
    },
  }
}

export function navigateAfterEpic(action$, store, { API }) {
  return action$.ofType(navigateAssync)
    .switchMap(function({ payload }) {
      const { actionType, path, state } = payload
      return action$.ofType(actionType)
        .take(1) // wait only one action
        .takeUntil(action$.ofType(LOCATION_CHANGE))
        .switchMap(_ => {
          return of(
            push({ pathname: path, state })
          )
        })
    })
}
