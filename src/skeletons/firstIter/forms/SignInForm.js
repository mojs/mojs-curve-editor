import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import {Link} from 'react-router'
export const fields = [ 'email', 'password' ]
import request from 'axios'
import config from 'package.json'
import {auth} from 'actions/user'


const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    if(values.email && values.password ) {
      request.get(`http://${config.apiHost}:${config.apiPort}/auth/${values.email}/${values.password}`)
        .then (response => {
          if(response.status === 200) {
            dispatch(auth(values.email, values.password))
            resolve()
          }
        })
        .catch(response => {
          if(response.status !== 200) {
            reject({ username: 'Invalid username or password', _error: 'Login failed!' })
          }
        })
    }
  })
}

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

class SignInForm extends Component {
  render() {
    const {fields: { email, password }, error, resetForm, handleSubmit, submitting } = this.props
    return (<form onSubmit={handleSubmit(submit)} className="form-horizontal">
        {error && <div className="form-error">{error}</div>}
        <div className="form-group">
          <div className="col-xs-12">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input type="text" className="form-control" placeholder="Enter Email" {...email}/>
            </div>
            {email.touched && email.error && <div className="input-group-error">{email.error}</div>}
          </div>
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-key"></i></span>
              <input type="text" className="form-control" placeholder="Enter Password" {...password}/>
            </div>
            {password.touched && password.error && <div className="input-group-error">{password.error}</div>}
          </div>
        </div>



        <div className="panel-footer">
          <div className="clearfix">
            <button disabled={submitting} type="submit" className="btn btn-primary pull-center">
              {submitting ? <i className="fa fa-cog fa-spin"/> : <i className="fa fa-rocket"/>} Login
            </button>
          </div>
        </div>
      </form>
    )
  }
}

SignInForm.propTypes = {
  fields: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}


export default reduxForm({
  form: 'SignInForm',
  fields,
  validate
})(SignInForm)
