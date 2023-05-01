import DashboardView from './DashboardView'
import { connect } from 'react-redux'
import { logout } from 'store/session'


export default connect(null, { logout })(DashboardView)
