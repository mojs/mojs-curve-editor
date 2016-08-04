import {createStore} from 'redux';
// import reducer
import reducer from './reducers/index-reducer';

const store = createStore( reducer );

export default store;