import { push } from 'react-router-redux'
import { of } from 'rxjs/observable/of'
import get from 'lodash/get'

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
    .switchMap(function({ payload, meta, type }) {
      const { actionType, path, state } = payload
      return action$.filter(action => {
        return action.type === actionType && (!get(state, 'namespace') || get(action, 'meta.resource.namespace') === get(state, 'namespace'))
      })
        // TODO stop navigation on manual navigate
        .takeUntil(action$.ofType(get(state.takeUntil, '@@No_action@@')))
        .switchMap(_ => {
          return of(
            push({ pathname: path, state })
          )
        })
    })
}
