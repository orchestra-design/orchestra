/* global tw */
import { css } from 'react-emotion'

export const ColumnThree = css`
  ${tw([
    'md:px-q12', 'mb-q24', 'md:mb-0',
    'w-full', 'md:w-1/3'
  ])};
  min-width: calc((1 / 3 * 100%) - 1.5rem);
`

export const Row = css`
  ${tw([
    'flex', 'flex-col', 'md:flex-row',
    'md:-mx-q12'
  ])};
`

export const SimpleRow = css`
  ${tw([
    'flex', 'flex-row'
  ])};
`