import { createAction } from 'redux-actions'

import { INCREMENT, LOGO_IS_BLACK, THEME } from '../constants'

const increment = createAction(INCREMENT)
const logoIsBlack = (bool) => ({type: LOGO_IS_BLACK, payload: bool})
const actionTheme = createAction(THEME)

export const increaseCount = add => 
  dispatch => { dispatch(increment(add)) }

export const blackenLogo = bool =>
  dispatch => { dispatch(logoIsBlack(bool)) }

export const changeTheme = payload =>
  dispatch => { dispatch(actionTheme(payload)) }
