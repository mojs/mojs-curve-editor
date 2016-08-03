import {createStore} from 'redux';
// Redux utility functions
import { combineReducers } from 'redux';
// redux-undo higher-order reducer
import undoable, { includeAction, excludeAction } from 'redux-undo';

const INITIAL_STATE = {
  translate:          { x: 150, y: 0 },
  resize_top:          0,
  tempResize_top:      0,

  resize_right:        0,
  tempResize_right:    0,

  resize_bottom:       0,
  tempResize_bottom:   0
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'EDITOR_RESIZE': {
      const {data} = action;
      const {type} = data;
      const delta = ( type === 'top' || type === 'bottom' ) ? data.y : data.x;

      return { ...state, [`tempResize_${action.data.type}`]: delta };
    }

    case 'EDITOR_RESIZE_END': {
      const {data} = action;
      const {type} = data;
      const delta = ( type === 'top' || type === 'bottom' ) ? data.y : data.x;
      // get the total resize value ( temporary + actual )
      const resize = state[`resize_${action.data.type}`] + delta;
      // if the type if to - it has the `-` as base so we need to swap methods
      const mathMethod = ( type === 'top' ) ? 'min' : 'max';
      const newState = { ...state,
        [`resize_${action.data.type}`]: Math[mathMethod](0, resize),
        [`tempResize_${action.data.type}`]: 0
      };

      return newState;
    }

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