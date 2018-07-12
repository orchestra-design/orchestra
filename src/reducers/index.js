import { assoc } from '../helpers'
import {  handleActions } from 'redux-actions'

import { initState } from '../init'

const reducer = handleActions(
  {
    THEME: (state, action) => assoc(
      'storedTheme', action.payload,
      state
    ),
    TOGGLE_MENU: (state) => assoc(
      'isMenu', !state.isMenu,
      state
    ),
  },
  initState
)

export default reducer