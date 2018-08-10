import isEmpty from 'lodash/isEmpty'
import { createSelector } from 'reselect'

export const F_PUBLIC = 2 ** 0
export const F_PROTECTED = 2 ** 1
export const F_UNAUTHORISED = 2 ** 2

// NOTE F_CHIEF have full access to application
// should contains all flags. the value should be next exponent minus one
// NOTE the maximum exponent can be 52, because the MAX_SAFE_INTEGER is (2 ** 53)
// const F_CHIEF            = 2 ** 52 - 1

export const userLevelSelector = createSelector(
  // base permissions
  (state) => isEmpty(state.resource.session) ? F_UNAUTHORISED : F_PROTECTED,

  // collect all user permissions
  (...args) => args.reduce((level, flag) => level | flag, F_PUBLIC)
)
