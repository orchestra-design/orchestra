import { createAction } from 'redux-actions'

import { INCREMENT } from '../constants'

const increment = createAction(INCREMENT)

export const increaseCount = add => 
  dispatch => { dispatch(increment(add)) }