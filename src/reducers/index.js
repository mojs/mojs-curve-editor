import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'

import user from './user';
import layout from './layout';


const rootReducer = combineReducers({
  user : user,
  layout : layout,
  form: formReducer
});

export default rootReducer;
