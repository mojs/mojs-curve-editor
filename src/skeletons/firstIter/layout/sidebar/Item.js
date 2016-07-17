import React from 'react'
import {Link} from 'react-router'


export default class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
    this.clickToggle = this.clickToggle.bind(this);
  }

  componentWillMount() {
    this.setState({toggle: false})
  }

  clickToggle() {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    let {name, leftIcon, rightIcon, childs, url} = this.props;
    return(
      <li key={name} className={(childs ? 'hasChild': '') + (this.state.toggle ? ' open':'')}>
      <Link onClick={this.clickToggle} to={url ? url: '/app'}>{leftIcon && <i className={leftIcon.style ? leftIcon.style : ''}></i>} <span>{name ? name : 'Error'}</span> <span className={rightIcon && rightIcon.style ? rightIcon.style : ''}>{rightIcon && rightIcon.name ? rightIcon.name : ''}</span></Link>
        {childs && <ul className="acc-menu" style={{display: (this.state.toggle ? 'block' : 'none')}}>
          {childs.map((item) => {return(<span>{item}</span>)})}
        </ul>}
      </li>)
  }
}

//  <a href={url ? url: '#'}>{leftIcon ? leftIcon : ''} <span>{name ? name : 'Error'}</span></a>
