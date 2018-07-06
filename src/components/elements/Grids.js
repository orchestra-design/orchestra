/* global tw */
import { css } from 'react-emotion'

export const ColumnThree = css`
  ${tw([
    'flex-1', 'px-1/12',
    'screen:px-1/47', 'w-full',
    'screen:w-1/3'
  ])};
`

export const Row = css`
  ${tw([
    'flex', 'flex-col', 'screen:flex-row',
    'flex-wrap', '-mx-1/12',
    'screen:-mx-1/47', 'w-full'
  ])};
`