import React from 'react'
import ReactDOM from 'react-dom'
import request from 'axios'
import config from '../package.json'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import reducers from './reducers'

import {tokenValid} from './actions/user'

let store = configureStore(reducers);

import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import IndexPage from './IndexPage'
import App from './App';
import Init from './Init'

import Sign from './containers/Sign'
import Main from './containers/Main'
import AppExample from './containers/Example'

function checkToken() {
  if(localStorage.getItem('user_id') && localStorage.getItem('token')) {
    request.get(`http://${config.apiHost}:${config.apiPort}/checkToken/${localStorage.getItem('user_id')}/${localStorage.getItem('token')}`)
      .then(response => {
        if(response.status === 200) {
          store.dispatch(tokenValid(response.data.user, localStorage.getItem('token')))
        }
      })
      .catch(response => {
        if(response.status !== 200) {
          localStorage.removeItem('user_id')
          localStorage.removeItem('token')
        }
      })
  }
}

function onlyGuests(nextState) {
  console.log(nextState)
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Init} onEnter={checkToken()}>
        <IndexRoute component={IndexPage}/>
        <Route path="sign" component={Sign} />
        <Route path="app" component={App}>
          <IndexRoute component={Main}/>
          <Route path="example" component={AppExample}/>
        </Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('root'));
