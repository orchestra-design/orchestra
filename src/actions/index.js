import { createAction } from 'redux-actions'

import {
  COUNT_JUMBO,
  HAS_BACK_IMAGE,
  HIDE_DOWN,
  SET_BACK_SLIDER,
  SET_IMAGE,
  SET_RIGHT_IMAGE,
  SET_SIC_GRIDE,
  SET_WORK_FILTER,
  THEME,
  TOGGLE_GRID,
  TOGGLE_MENU,
  TOGGLE_WORK_FILTER,
} from '../constants'

const countJumboAction = createAction(COUNT_JUMBO)
const hideDownAction = createAction(HIDE_DOWN)
const itHasBackImageAction = createAction(HAS_BACK_IMAGE)
const setBackSliderAction = createAction(SET_BACK_SLIDER)
const setImageAction = createAction(SET_IMAGE)
const setRightImageAction = createAction(SET_RIGHT_IMAGE)
const setSicGridAction = createAction(SET_SIC_GRIDE)
const setWorkFilterAction = createAction(SET_WORK_FILTER)
const toggleGrideAction = createAction(TOGGLE_GRID)
const toggleMenuAction = createAction(TOGGLE_MENU)
const toggleWorkFilterAction = createAction(TOGGLE_WORK_FILTER)

export const changeTheme = payload => dispatch => {
  dispatch(createAction(THEME)(payload))
}

export const countJumbo = payload => dispatch => {
  dispatch(countJumboAction(payload))
}

export const hideDown = payload => dispatch => {
  dispatch(hideDownAction(payload))
}

export const itHasBackImage = payload => dispatch => {
  dispatch(itHasBackImageAction(payload))
}

export const pageTransition = () => dispatch => {
  dispatch(countJumboAction(0))
  dispatch(hideDownAction(false))
  dispatch(setBackSliderAction(false))
  dispatch(setImageAction(null))
  dispatch(setRightImageAction(null))
  dispatch(toggleMenuAction(false))
}

export const setBackSlider = payload => dispatch => {
  dispatch(setBackSliderAction(payload))
}

export const setImage = payload => dispatch => {
  dispatch(setImageAction(payload))
}

export const setRightImage = payload => dispatch => {
  dispatch(setRightImageAction(payload))
}

export const setSicGrid = payload => dispatch => {
  dispatch(setSicGridAction(payload))
}

export const setWorkFilter = payload => dispatch => {
  dispatch(setWorkFilterAction(payload))
}

export const toggleGrid = () => dispatch => {
  dispatch(toggleGrideAction())
}

export const toggleMenu = () => dispatch => {
  dispatch(toggleMenuAction())
}

export const toggleWorkFilter = () => dispatch => {
  dispatch(toggleWorkFilterAction())
}
