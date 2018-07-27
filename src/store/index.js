import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from '../reducers'

export default () => {
  const store = reduxCreateStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store
}