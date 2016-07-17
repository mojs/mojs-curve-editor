import React from 'react'

import './blocks.scss'

export default class Block extends React.Component {
  render() {

    let {title, secondary, content, additional, style} = this.props;



    return(
      <div className={"amazo-tile " + (style ? style : 'default')}>
        <div className="tile-heading">
          <div className="title">{title ? title : 'TITLE'}</div>
          <div className="secondary">{secondary ? secondary : 'SECONDARY'}</div>
        </div>
        <div className="tile-body">
          <span className="content">{content ? content : 'CONTENT'}</span>
        </div>
        <div className="tile-footer text-center">
          <span className="info-text text-right">{additional ? additional : 'ADDITIONAL'}</span>
        </div>
      </div>)
  }
}
