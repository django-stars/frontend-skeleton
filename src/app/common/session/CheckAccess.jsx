import { compose } from 'redux'
import { connect } from 'react-redux'
import { F_PUBLIC, userLevelSelector } from './access'
// import { Children } from 'react'


function CheckAccess({ access = F_PUBLIC, level, fallback = null, children }) {
  return level & access ? children : fallback
}

export default compose(
  connect(
    (state, props) => ({
      level: userLevelSelector({
        ...state,
      }),
    })
  ),
)(CheckAccess)
