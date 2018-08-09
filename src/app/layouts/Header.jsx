import { Component } from 'react'
import { Link } from 'common/router/Link'

export default class Header extends Component {
  render() {
    return (
      <header>
        <Link to="root">Logo</Link>
        <Link to="test">test</Link>
      </header>
    )
  }
}
