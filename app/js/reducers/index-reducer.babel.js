// Redux utility functions
import { combineReducers } from 'redux';

import resizeReducer from './resize-reducer';
import pointsReducer from './points-reducer';

const reducer = combineReducers({
  resize: resizeReducer,
  points: pointsReducer
});

export default reducer;