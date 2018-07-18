import { createAction } from 'redux-actions'

import { delay } from '../helpers'

import { 
  COLLAPSE_MENU, MENU_TRANSITION, SCROLL_MENU,
  THEME, TOGGLE_GRID, TOGGLE_MENU,
} from '../constants'

const collapseMenuAction = createAction(COLLAPSE_MENU)
const toggleGrideAction = createAction(TOGGLE_GRID)
const toggleMenuAction = createAction(TOGGLE_MENU)
const scrollMenuAction = createAction(SCROLL_MENU)

export const startTransition = () => ({ type: MENU_TRANSITION, payload: true })
export const stopTransition = () => ({ type: MENU_TRANSITION, payload: false })

export const changeTheme = payload =>
  dispatch => { 
    dispatch(createAction(THEME)(payload))
  }

export const collapseMenu = payload =>
  dispatch => {
    dispatch(startTransition())
    dispatch(collapseMenuAction(payload))
    delay(400, () => dispatch(stopTransition()))
  }

export const pageTransition = () =>
  dispatch => {
    dispatch(collapseMenuAction(false))
    dispatch(toggleMenuAction(false))
    dispatch(scrollMenuAction(false))
  }

export const srollMenu = payload =>
  dispatch => { 
    delay(400, () => dispatch(scrollMenuAction(payload)))
  }

export const toggleGrid = () =>
  dispatch => { 
    dispatch(toggleGrideAction())
  }

export const toggleMenu = () =>
  dispatch => { 
    dispatch(toggleMenuAction())
  }
