import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import {Link} from 'react-router'
export const fields = ['name', 'email', 'password', 'password_confirm' ]
import request from 'axios'
import config from 'package.json'
import {auth} from 'actions/user'


const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    if(values.name && values.email && values.password ) {
      request.post(`http://${config.apiHost}:${config.apiPort}/register`, {
          name: values.name,
          email: values.email,
          password: values.password
      })
        .then (response => {
          if(response.status === 200) {
            dispatch(auth(values.email, values.password))
            resolve()
          }
        })
        .catch(response => {
          if(response.status !== 200) {
            console.log(response)
            if(response.data.errors.name)     { reject({ name:      response.data.errors.name[0],     _error: 'Register failed!' }) }
            if(response.data.errors.email)    { reject({ email:     response.data.errors.email[0],    _error: 'Register failed!' }) }
            if(response.data.errors.password) { reject({ password:  response.data.errors.password[0], _error: 'Register failed!' }) }
          }
        })
    }
  })
}

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.password_confirm) {
    errors.password_confirm = 'Required'
  }
  if (values.password_confirm !== values.password) {
    errors.password = errors.password_confirm = 'Passwords do not match'
  }
  if (!values.name) {
    errors.name = 'Required'
  }
  return errors
}

class SignUpForm extends Component {
  render() {
    const {fields: { email, password, name, password_confirm }, error, resetForm, handleSubmit, submitting } = this.props
    return (<form onSubmit={handleSubmit(submit)} className="form-horizontal">
        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <div className="col-xs-12">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input type="text" className="form-control" placeholder="Enter Full name" {...name}/>
            </div>
            {name.touched && name.error && <div className="input-group-error">{name.error}</div>}
          </div>
        </div>

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

        <div className="form-group">
          <div className="col-xs-12">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-key"></i></span>
              <input type="text" className="form-control" placeholder="Confirm Password" {...password_confirm}/>
            </div>
            {password_confirm.touched && password_confirm.error && <div className="input-group-error">{password_confirm.error}</div>}
          </div>
        </div>

        <div className="panel-footer">
          <div className="clearfix">
            <button disabled={submitting} type="submit" className="btn btn-primary pull-center">
              {submitting ? <i className="fa fa-cog fa-spin"/> : <i className="fa fa-rocket"/>} Register
            </button>
          </div>
        </div>
      </form>
    )
  }
}

SignUpForm.propTypes = {
  fields: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}


export default reduxForm({
  form: 'SignUpForm',
  fields,
  validate
})(SignUpForm)
