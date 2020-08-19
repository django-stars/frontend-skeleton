import { Component } from 'react'
import { Link } from 'common/router/Link'
import logo from '../../img/ds-logo.png'
import styles from './layout.scss'

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <Link to="root"><img src={logo} alt='logo'/></Link>
      </header>
    )
  }
}
