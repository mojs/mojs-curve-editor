import {createStore} from 'redux';
// redux-undo higher-order reducer
import undoable, { includeAction, excludeAction } from 'redux-undo';
// import reducer
import reducer from './reducers/index-reducer';

const store = createStore( undoable(reducer, {
  filter: function filterActions(action, currState, history) {
    return action.isRecord; // only add to history if isRecord set on action
  }
}));

export default store;