import { Component } from 'react'
import { Link } from 'common/router/Link'

import classNames from './styles.scss'

export default class Header extends Component {
  render() {
    return (
      <header className={classNames.header}>
        <Link to="root">Logo</Link>
        <Link to="test">test</Link>
      </header>
    )
  }
}
