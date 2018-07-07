import { handleAction } from 'redux-actions'

import { INCREMENT } from '../constants'
import { initState } from '../init'

const reducer = handleAction(
  INCREMENT,
  (state, action) => ({
    ...state,
    count: state.count + action.payload,
  }),
  initState
)

export default reducer