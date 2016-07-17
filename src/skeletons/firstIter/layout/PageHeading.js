import React from 'react'
import Helmet from 'react-helmet'

export default class PageHeading extends React.Component {
  render() {
    return (
      <div className="page-heading">
        <h1>{this.props.title ? this.props.title : 'Упячка попяке'}</h1>
        {this.props.title && <Helmet title={this.props.title} />}
      </div>)
  }
}
