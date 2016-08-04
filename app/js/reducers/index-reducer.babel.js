// Redux utility functions
import { combineReducers } from 'redux';
// redux-undo higher-order reducer
import undoable from 'redux-undo';

import resizeReducer from './resize-reducer';
import pointsReducer from './points-reducer';

const reducer = combineReducers({
  resize: resizeReducer,
  points: undoable(pointsReducer, {
    limit: 10,
    filter: function filterActions(action, currState, history) {
      return action.isRecord; // only add to history if isRecord set on action
    },
    debug: false
  })
});

export default reducer;