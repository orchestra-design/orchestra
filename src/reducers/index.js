import { assoc, merge } from '../helpers'
import {  handleActions } from 'redux-actions'

import { initState } from '../init'

const reducer = handleActions(
  {
    THEME: (state, action) => assoc(
      'storedTheme', action.payload,
      state
    ),
    TOGGLE_MENU: (state) => merge(
      state,
      {
        isMenu: !state.isMenu,
        previousTheme: state.storedTheme,
        storedTheme: !state.isMenu 
          ? 'black' 
          : state.previousTheme
      }
    ),
  },
  initState
)

export default reducer