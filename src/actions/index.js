import { createAction } from 'redux-actions'

import { debounce, delay } from '../helpers'

import { 
  COLLAPSE_MENU, MENU_TRANSITION, SCROLL_MENU,
  THEME, TOGGLE_MENU,
} from '../constants'

export const startTransition = () => ({ type: MENU_TRANSITION, payload: true })
export const stopTransition = () => ({ type: MENU_TRANSITION, payload: false })

export const changeTheme = payload =>
  dispatch => { 
    dispatch(createAction(THEME)(payload))
  }

export const collapseMenu = payload =>
  debounce(400, dispatch => {
    dispatch(startTransition())
    dispatch(createAction(COLLAPSE_MENU)(payload))
    delay(600, () => dispatch(stopTransition()))
  })

export const srollMenu = payload =>
  debounce(600, dispatch => { 
    dispatch(createAction(SCROLL_MENU)(payload))
  })

export const toggleMenu = () =>
  dispatch => { dispatch(createAction(TOGGLE_MENU)()) }
