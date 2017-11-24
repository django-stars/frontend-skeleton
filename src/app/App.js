import React, { Component } from 'react';
import Child from './TESTChild'

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
export default class App extends Component {
  constructor() {
    super()
    this.state = {a:1}

    this.updateState = this.updateState.bind(this)
  }

  render() {
    return (
      <div>
        {this.state.a}
        <button onClick={this.updateState}>a++</button>
        !!
        <Child />
      </div>
    );
  }

  updateState() {
    this.setState({a: this.state.a+1})
  }

}
