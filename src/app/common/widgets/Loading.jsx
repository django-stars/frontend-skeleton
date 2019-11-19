import PropTypes from 'prop-types'

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
}

Loading.defaultProps = {
  children: undefined,
}

export default function Loading({ isLoading, children }) {
  return isLoading ? <div className='loading-wrapper'>loading..</div> : children
}
