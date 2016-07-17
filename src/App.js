import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import Sidebar  from './containers/Sidebar'
import Header   from './containers/Header'
import Main     from './containers/Main'

import * as UserActions   from './actions/user'
import * as LayoutActions from './actions/layout'



class App extends React.Component {
  componentWillMount() {
    this.setState({})
  }

  render() {
    if(!localStorage.getItem('user_id') ||   !localStorage.getItem('token')) {
      window.location = '#/sign'
    }
    return (
          <div>
            {this.props.user.status && <div>
            <Header color="default"/>
              <div id="wrapper">
                <div id="layout-static">
                  <Sidebar
                    color="inverse"
                    data={this.props}/>
                  <div className="static-content-wrapper">
                    <div className="static-content">
                      {!this.props.children && <Main />}
                      {this.props.children}
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          </div>)
  }
}


function mapStateToProps(state) {
  return {
    layout: state.layout,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, UserActions, LayoutActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
