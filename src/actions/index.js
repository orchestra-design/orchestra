import { createAction } from 'redux-actions'

import { THEME, TOGGLE_MENU } from '../constants'

const actionTheme = createAction(THEME)
const actionMenu = createAction(TOGGLE_MENU)

export const changeTheme = payload =>
  dispatch => { dispatch(actionTheme(payload)) }

export const toggleMenu = () =>
  dispatch => { dispatch(actionMenu()) }
