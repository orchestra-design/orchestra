import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from '../reducer'

const initialState = { count: 0 }

const createStore = () => reduxCreateStore(
  reducer, initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default createStore