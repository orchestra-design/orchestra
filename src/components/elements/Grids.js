/* global tw */
import { css } from 'react-emotion'

export const ColumnEight = css`
  ${tw([
    'md:px-q12', 'mb-q24', 'md:mb-0',
    'w-full', 'md:w-2/3'
  ])};
  max-width: calc((2 / 3 * 100%) - 1.5rem);
  min-width: calc((2 / 3 * 100%) - 1.5rem);
`

export const ColumnThree = css`
  ${tw([
    'md:px-q12', 'mb-q24', 'md:mb-0',
    'w-full', 'md:w-1/3'
  ])};
  max-width: calc((1 / 3 * 100%) - 1.5rem);
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