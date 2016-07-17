import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../middlewares/promise'
import authMiddleware from '../middlewares/auth'
import reducer from '../reducers';
import DevTools from '../containers/DevTools'

const enhancer = compose(
  applyMiddleware(promiseMiddleware, authMiddleware),
  DevTools.instrument()
)


export default function configureStore(initialState) {

  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
