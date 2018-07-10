import { createAction } from 'redux-actions'

import { THEME } from '../constants'

const actionTheme = createAction(THEME)

export const changeTheme = payload =>
  dispatch => { dispatch(actionTheme(payload)) }
