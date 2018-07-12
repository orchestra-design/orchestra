import { assoc, merge } from '../helpers'
import {  handleActions } from 'redux-actions'

import { initState } from '../init'

const reducer = handleActions(
  {
    COLLAPSE_MENU: (state, action) => assoc(
      'collapsedMenu', action.payload,
      state
    ),
    SCROLL_MENU: (state, action) => assoc(
      'hiddenMenu', action.payload,
      state
    ),
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