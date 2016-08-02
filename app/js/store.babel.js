import {createStore} from 'redux';
// Redux utility functions
import { combineReducers } from 'redux';
// redux-undo higher-order reducer
import undoable, { includeAction, excludeAction } from 'redux-undo';

const INITIAL_STATE = {
  translate:          { x: -50, y: 150 },
  tempResize_top:      0,
  tempResize_right:    0,
  tempResize_bottom:   0
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'EDITOR_RESIZE':
      const {data} = action;
      const {type} = {data};
      const delta = ( type === 'top' || type === 'bottom' ) ? data.x : data.y;

      return { ...state, [`tempResize_${action.data.type}`]: delta };

    case 'EDITOR_TRANSLATE': { return { ...state, translate: action.data }; }
  }
  return state;
}

const store = createStore( undoable(reducer, {
  filter: function filterActions(action, currState, history) {
    return action.isRecord; // only add to history if isRecord set on action
  }
}));

export default store;