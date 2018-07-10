import { handleActions } from 'redux-actions'

import { initState } from '../init'

const reducer = handleActions(
  {
    THEME: (state, action) => ({
      ...state,
      storedTheme: action.payload
    }),
  },
  initState
)

export default reducer