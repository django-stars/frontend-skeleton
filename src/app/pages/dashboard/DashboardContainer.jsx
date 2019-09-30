import { PureComponent } from 'react'
import Dashboard from './Dashboard'
import { connect } from 'react-redux'
import { logout } from 'common/session'

class DashboardContainer extends PureComponent {
  render() {
    return <Dashboard {...this.props} text={'Dashboard'}/>
  }
}

export default connect(null, { logout })(DashboardContainer)
