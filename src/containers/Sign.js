import React from 'react'
import classNames from 'classnames'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SignInForm from 'template/forms/SignInForm'
import SignUpForm from 'template/forms/SignUpForm'
import 'styles/toggle.scss'


import * as UserActions   from 'actions/user'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {toggle: true};
  }

  handleToggle() {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    if(localStorage.getItem('user_id') || localStorage.getItem('token')) {
      window.location = '#/app'
    }
    return (
          <div className="container text-center" id="login-form">
          	<a href="/" className="login-logo "><img style={{width: '184px', borderRadius: '30%',padding: '30px 0px'}} src="assets/img/logo.jpg"/></a>
          	<div className="row">
          		<div className="col-md-4 col-md-offset-4">
          			<div className="panel panel-default">
          				<div className="panel-body panel-sign">
                    <div className="toggle-container">
                      <span onClick={!this.state.toggle ? () => this.handleToggle() : () => {}} className={classNames('element', {selected:  this.state.toggle})}>SIGN IN</span>
                      <span onClick={ this.state.toggle ? () => this.handleToggle() : () => {}} className={classNames('element', {selected: !this.state.toggle})}> SIGN UP</span>
                    </div>
                    {this.state.toggle ? <SignInForm /> : <SignUpForm />}
          				</div>
          			</div>
          		</div>
          	</div>
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
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
