import { createAction } from 'redux-actions'

import { 
  COLLAPSE_MENU, SCROLL_MENU,
  THEME, TOGGLE_MENU,
} from '../constants'

export const changeTheme = payload =>
  dispatch => { dispatch(createAction(THEME)(payload)) }

export const collapseMenu = payload =>
  dispatch => { dispatch(createAction(COLLAPSE_MENU)(payload)) }

export const srollMenu = payload =>
  dispatch => { dispatch(createAction(SCROLL_MENU)(payload)) }

export const toggleMenu = () =>
  dispatch => { dispatch(createAction(TOGGLE_MENU)()) }
