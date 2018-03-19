import debounce from 'lodash/debounce'
import pick from 'lodash/pick'


const CACHE_STATE_KEYS = JSON.parse(process.env.CACHE_STATE_KEYS)
const state = JSON.parse(localStorage.getItem(process.env.STORAGE_KEY) || '{}')

const middleware = store => next => action => {
  let nextState = next(action)

  cacheState(
    CACHE_STATE_KEYS ? pick(nextState, CACHE_STATE_KEYS) : nextState
  )

  return nextState
}

const cacheState = debounce(function(state) {
  localStorage.setItem(
    process.env.STORAGE_KEY,
    JSON.stringify(state)
  )
})

export { middleware, state }
