import { createAction } from 'redux-actions'
import { remote } from 'electron'
const dialog = remote.dialog

const UPDATE_PROGRESS = Symbol('UPDATE_PROGRESS')
const RESET_PROGRESS = Symbol('RESET_PROGRESS')

const updateProgress = createAction(UPDATE_PROGRESS)
const resetProgress = createAction(RESET_PROGRESS)

const timeToUpdate = 9;

const defaultState = {
  paths: [],
  timeCounter: timeToUpdate,
  showProgressOverlay: false,
  from: 0,
  total: 250000,
}

const progressReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case UPDATE_PROGRESS:
      return {
        ...state,
        ...payload
      }
    case RESET_PROGRESS:
      return defaultState

    default:
      return state;
  }
}


const reducers = { progress: progressReducer }

export { timeToUpdate, reducers, resetProgress, updateProgress }
