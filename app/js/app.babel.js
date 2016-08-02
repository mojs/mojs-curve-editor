import './tags/curve-editor.tag';
import {createStore} from 'redux';
// Redux utility functions
import { combineReducers } from 'redux';
// redux-undo higher-order reducer
import undoable, { includeAction, excludeAction } from 'redux-undo';
require('../css/main');


const INITIAL_STATE = {
  msg: '♥ Curve Editor ♥',
  translate: { x: 0, y:0 }
}

console.clear();
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_MSG': { return { ...state, msg: action.data }; }
    case 'EDITOR_TRANSLATE': { return { ...state, translate: action.data }; }
  }
  return state;
}

setTimeout(function () {
  store.dispatch({ type: 'ADD_MSG', data: '♥ mojs Curve Editor ♥' });
}, 2000);

const store = createStore( undoable(reducer, {
  filter: function filterActions(action, currState, history) {
    return action.isRecord; // only add to history if isRecord set on action
  }
}));

document.addEventListener('DOMContentLoaded', () => {
  // riot.mount('*',{ store: store })
  riot.mount('curve-editor',{ store: store })
});