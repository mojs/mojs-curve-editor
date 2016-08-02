import './tags/curve-editor.tag';
import {createStore} from 'redux';
// Redux utility functions
import { combineReducers } from 'redux';
// redux-undo higher-order reducer
import undoable, { includeAction, excludeAction } from 'redux-undo';
require('../css/main');

console.clear();
const reducer = (state = { msg: '♥ Curve Editor ♥' }, action) => {
  switch (action.type) {
    case 'ADD_MSG': { return { ...state, msg: action.data }; }
  }
  return state;
}

setTimeout(function () {
  store.dispatch({ type: 'ADD_MSG', data: '♥ mojs Curve Editor ♥' });
}, 2000);

// , { filter: excludeAction(['ADD_MSG']) }
const store = createStore( undoable(reducer) );

document.addEventListener('DOMContentLoaded', () => {
  // riot.mount('*',{ store: store })
  riot.mount('curve-editor',{ store: store })
});