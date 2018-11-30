import { PureComponent } from 'react'
import Dashboard from './Dashboard'

class DashboardContainer extends PureComponent {
  render() {
    return <Dashboard {...this.props} text={'Dashboard'}/>
  }
}

// let dashboardResource = {
//   prefetch: false,
//   namespace: 'dashboard',
//   endpoint: 'dashboard',
// }

export default DashboardContainer
