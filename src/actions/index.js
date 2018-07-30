import { createAction } from 'redux-actions'

import { delay } from '../helpers'

import { 
  COLLAPSE_MENU, COUNT_JUMBO, MENU_TRANSITION, 
  SCROLL_MENU, SET_BACK_SLIDER, SET_IMAGE, 
  SET_RIGHT_IMAGE, SET_SIC_GRIDE, SET_WORK_FILTER,
  THEME, TOGGLE_GRID, TOGGLE_MENU,
  TOGGLE_WORK_FILTER
} from '../constants'

const collapseMenuAction = createAction(COLLAPSE_MENU)
const countJumboAction = createAction(COUNT_JUMBO)
const scrollMenuAction = createAction(SCROLL_MENU)
const setBackSliderAction = createAction(SET_BACK_SLIDER)
const setImageAction = createAction(SET_IMAGE)
const setRightImageAction = createAction(SET_RIGHT_IMAGE)
const setSicGridAction = createAction(SET_SIC_GRIDE)
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
    dispatch(countJumboAction(0))
    dispatch(scrollMenuAction(false))
    dispatch(setBackSliderAction(false))
    dispatch(setImageAction(null))
    dispatch(setRightImageAction(null))
    dispatch(toggleMenuAction(false))
  }
  
  export const srollMenu = payload =>
  dispatch => {
    dispatch(scrollMenuAction(payload))
  }
  
  export const setBackSlider = payload =>
  dispatch => { 
    dispatch(startTransition())
    dispatch(setBackSliderAction(payload))
    delay(600, () => dispatch(stopTransition()))
  }

export const setImage = payload =>
  dispatch => { 
    dispatch(setImageAction(payload))
  }

export const setRightImage = payload =>
  dispatch => { 
    dispatch(setRightImageAction(payload))
  }

export const setSicGrid = payload =>
  dispatch => {
    dispatch(setSicGridAction(payload))
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
