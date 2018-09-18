import { assoc, merge } from '../helpers'
import { handleActions } from 'redux-actions'

import { initState } from '../init'

const reducer = handleActions(
  {
    COUNT_JUMBO: (state, action) => assoc('jumboCount', action.payload, state),
    HAS_BACK_IMAGE: (state, action) =>
      assoc('hasBackImage', action.payload, state),
    HIDE_DOWN: (state, action) => assoc('hiddenDown', action.payload, state),
    THEME: (state, action) => assoc('storedTheme', action.payload, state),
    SET_BACK_SLIDER: (state, action) =>
      assoc('backSlider', action.payload, state),
    SET_IMAGE: (state, action) => assoc('backImage', action.payload, state),
    SET_RIGHT_IMAGE: (state, action) =>
      assoc('rightImage', action.payload, state),
    SET_SIC_GRIDE: (state, action) => assoc('sicgrid', action.payload, state),
    SET_WORK_FILTER: (state, action) =>
      assoc('worksFilter', action.payload, state),
    TOGGLE_GRID: state => assoc('worksGrid', !state.worksGrid, state),
    TOGGLE_MENU: (state, action) =>
      merge(state, {
        isMenu: action.payload !== undefined ? action.payload : !state.isMenu,
        previousTheme: state.storedTheme,
        storedTheme:
          action.payload !== undefined
            ? 'white'
            : !state.isMenu
              ? 'black'
              : state.previousTheme,
      }),
    TOGGLE_WORK_FILTER: state =>
      assoc('worksFiltersOpen', !state.worksFiltersOpen, state),
  },
  initState
)

export default reducer
