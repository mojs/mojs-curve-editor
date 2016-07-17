import React from 'react'
import classNames from 'classnames'

import {Item, Separator, User} from 'template/layout/sidebar'

export default class Sidebar extends React.Component {
  render() {
    const {user} = this.props.data;
    return (
<div className={"static-sidebar-wrapper " + (this.props.color ? 'sidebar-'+this.props.color : 'sidebar-default')}>
  <div className="static-sidebar">
    <div className="sidebar">
      <User data={user}/>
      <div className="widget stay-on-collapse" id="widget-sidebar">
        <nav role="navigation" className="widget-body">
          <ul className="acc-menu">
            <Separator name="Main section" />
              <Item name="Dashboard"          leftIcon={{style: 'fa fa-home'}}/>
              <Item name="Example"            leftIcon={{style: 'fa fa-rocket'}} url="app/example"/>
              <Item name="Sign page"          leftIcon={{style: 'fa fa-key'}} url="/sign"/>
              <Item name="Social networks"    leftIcon={{style: 'fa fa-columns'}} rightIcon={{name: '4', style: 'badge badge-success'}}
                childs={[
                  <Item name="Facebook"   leftIcon={{style: 'fa fa-facebook'}}  rightIcon={{name: 'UPD', style: 'badge badge-success'}} />,
                  <Item name="VK"         leftIcon={{style: 'fa fa-vk'}}        rightIcon={{name: '3', style: 'badge badge-dark'}} />,
                  <Item name="Twitter"    leftIcon={{style: 'fa fa-twitter'}}   rightIcon={{name: '5', style: 'badge badge-dark'}} />,
                  <Item name="Instagram"  leftIcon={{style: 'fa fa-instagram'}} rightIcon={{name: '12', style: 'badge badge-dark'}} />
                ]}/>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</div>)
  }
}
