import CheckAccess from './CheckAccess'
export * as access from './access'

const logout = function() {
  return {
    type: '@ds-resource/set-data',
    meta: {
      resource: { namespace: 'session' },
    },
    payload: {},
  }
}

export {
  CheckAccess,
  logout,
}
