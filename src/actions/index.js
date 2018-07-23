import { createAction } from 'redux-actions'

import { delay } from '../helpers'

import { 
  COLLAPSE_MENU, COUNT_JUMBO, MENU_TRANSITION, 
  SCROLL_MENU, SET_IMAGE, SET_WORK_FILTER,
  THEME, TOGGLE_GRID, TOGGLE_MENU,
  TOGGLE_WORK_FILTER
} from '../constants'

const collapseMenuAction = createAction(COLLAPSE_MENU)
const countJumboAction = createAction(COUNT_JUMBO)
const scrollMenuAction = createAction(SCROLL_MENU)
const setImageAction = createAction(SET_IMAGE)
const setWorkFilterAction = createAction(SET_WORK_FILTER)
const toggleGrideAction = createAction(TOGGLE_GRID)
const toggleMenuAction = createAction(TOGGLE_MENU)
const toggleWorkFilterAction = createAction(TOGGLE_WORK_FILTER)

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

export const countJumbo = payload =>
  dispatch => {
    dispatch(countJumboAction(payload))
  }

export const pageTransition = () =>
  dispatch => {
    dispatch(collapseMenuAction(false))
    dispatch(setImageAction(null))
    dispatch(scrollMenuAction(false))
    dispatch(toggleMenuAction(false))
    dispatch(countJumboAction(0))
  }

export const srollMenu = payload =>
  dispatch => { 
    delay(400, () => dispatch(scrollMenuAction(payload)))
  }

export const setImage = payload =>
  dispatch => { 
    dispatch(setImageAction(payload))
  }

export const setWorkFilter = payload =>
  dispatch => { 
    dispatch(setWorkFilterAction(payload))
  }

export const toggleGrid = () =>
  dispatch => { 
    dispatch(toggleGrideAction())
  }

export const toggleMenu = () =>
  dispatch => { 
    dispatch(toggleMenuAction())
  }

export const toggleWorkFilter = () =>
  dispatch => { 
    dispatch(toggleWorkFilterAction())
  }
