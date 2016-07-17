import React from 'react'

export default class Component extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<li className="nav-separator">{this.props.name}</li>)
  }
}
