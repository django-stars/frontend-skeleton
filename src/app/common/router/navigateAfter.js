import { push } from 'react-router-redux'
import { of } from 'rxjs/observable/of'

import { namedRoutes } from './config'

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
        // TODO stop navigation on manual navigate
        // .takeUntil(navigate)
        .switchMap(_ => {
          return of(
            push({ pathname: path, state })
          )
        })
    })
}
