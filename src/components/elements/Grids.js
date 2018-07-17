/* global tw */
import { css } from 'react-emotion'

export const ColumnThree = css`
  ${tw([
    'md:px-1/47', 'mb-q24', 'md:mb-0',
    'w-full', 'md:w-1/3'
  ])};
`

export const Row = css`
  ${tw([
    'flex', 'flex-col', 'md:flex-row',
    'md:-mx-1/47'
  ])};
`