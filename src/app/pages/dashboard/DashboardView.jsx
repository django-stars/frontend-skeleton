import PropTypes from 'prop-types'

DashboardView.propTypes = {
  logout: PropTypes.func.isRequired,
}


export default function DashboardView({ logout }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
