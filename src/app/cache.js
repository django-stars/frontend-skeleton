import debounce from 'lodash/debounce'
import pick from 'lodash/pick'


const CACHE_STATE_KEYS = JSON.parse(process.env.CACHE_STATE_KEYS)
const state = JSON.parse(localStorage.getItem(process.env.STORAGE_KEY) || '{}')

const middleware = store => next => action => {
  let result = next(action)
  let nextState = store.getState()

  cacheState(
    CACHE_STATE_KEYS ? pick(nextState, CACHE_STATE_KEYS) : nextState
  )

  return result
}

const cacheState = debounce(function(state) {
  localStorage.setItem(
    process.env.STORAGE_KEY,
    JSON.stringify(state)
  )
})

export { middleware, state }
