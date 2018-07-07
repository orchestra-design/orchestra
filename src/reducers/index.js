import { handleActions } from 'redux-actions'

import { initState } from '../init'

const reducer = handleActions(
  {
    INCREMENT: (state, action) => ({
      ...state,
      count: state.count + action.payload,
    }),
    LOGO_IS_BLACK: (state, action) => ({
      ...state,
      logoIsWhite: !action.payload
    }),
  },
  initState
)

export default reducer