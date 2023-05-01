import { reset } from '@ds-frontend/cache'

export const LOGOUT_ACTION = 'LOGOUT_ACTION'

export function logout() {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_ACTION,
    })
    dispatch(reset())
  }
}
