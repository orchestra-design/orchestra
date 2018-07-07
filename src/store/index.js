import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from '../reducers'

const createStore = () => reduxCreateStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default createStore