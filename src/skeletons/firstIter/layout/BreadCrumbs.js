import React from 'react'
import {Link} from 'react-router'

export default class BreadCrumbs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <ol className="breadcrumb">
      <li className=""><Link to="/">Xуяк&Хуяк Company</Link></li>
      {this.props.childs && this.props.childs.map((bread) => {
        return(<li className={bread.last ? 'active':''}><Link to={bread.url ? bread.url : ''}>{bread.name}</Link></li>)
      })}
    </ol>)
  }
}
