import React from 'react'

export default class Footer extends React.Component {
  render() {
    return (<footer role="contentinfo">
          <div className="clearfix">
              <ul className="list-unstyled list-inline pull-left">
                  <li><h6 style="margin: 0;"> &copy; 2015 Avenger</h6></li>
              </ul>
              <button className="pull-right btn btn-link btn-xs hidden-print" id={"back-to-top"}><i className="fa fa-arrow-up"></i></button>
          </div>
      </footer>)
  }
}
