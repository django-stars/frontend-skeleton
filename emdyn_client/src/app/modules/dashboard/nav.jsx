import { Component } from 'react'
import { Link } from 'react-router'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { logout, checkLicense } from '../../modules/session'

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
    }
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {
    return (
      <nav className={this.state.collapsed ? 'collapsed' : ''}>
        <a className="collapse">Collapse <Icon onClick={this.toggleCollapse} type={this.state.collapsed ? 'right' : 'left'} /></a>
        <div className="wrap">
          <Link to="/dashboard" className={this.props.location.pathname === '/dashboard' ? 'active' : null}>
            <Icon type="area-chart" />Dashboard
          </Link>
          {
            this.props.checkLicense('BioTrace') ? (
              <Link to="/biotrace" className={this.props.location.pathname === '/biotrace' ? 'active' : null}>
                <Icon type="search" />BioTrace
              </Link>
            ) : null
          }

        </div>
        <a className="logout" onClick={this.props.logout}>
          <Icon type="poweroff" />{this.props.session.username ? this.props.session.username : 'Logout'}
        </a>
      </nav>
    )
  }
}

export default connect(
  ({session}) => ({
    session,
  }),
  {
    logout,
    checkLicense,
  }
)(Nav)
