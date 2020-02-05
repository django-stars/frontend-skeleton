import PropTypes from 'prop-types'

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  text: PropTypes.string,
}

Dashboard.defaultProps = {
  text: '',
}

export default function Dashboard({ logout, text }) {
  return (
    <div>
      <h1>{text}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
