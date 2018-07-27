/* global tw */
import { css } from 'react-emotion'

export const ColumnEight = css`
  ${tw([
    'md:px-q12', 'mb-q24', 'md:mb-0',
    'w-full', 'md:w-2/3'
  ])};
  min-width: calc((2 / 3 * 100%) - 1.5rem);
  @media(min-width: 768px) {
    max-width: calc((2 / 3 * 100%) - 1.5rem);
  }
`

export const ColumnFiveSix = css`
  ${tw([
    'md:px-q12', 'mb-q24', 'md:mb-0',
    'w-full', 'md:w-5/6'
  ])};
  min-width: calc((5 / 6 * 100%) - 1.5rem);
  @media(min-width: 768px) {
    max-width: calc((5 / 6 * 100%) - 1.5rem);
  }
`

export const ColumnThree = css`
  ${tw([
    'md:px-q12', 'mb-q24', 'md:mb-0',
    'w-full', 'md:w-1/3'
  ])};
  min-width: calc((1 / 3 * 100%) - 1.5rem);
  @media(min-width: 768px) {
    max-width: calc((1 / 3 * 100%) - 1.5rem);
  }
`

export const ColumnThreeFive = css`
  ${tw([
    'md:px-q12', 'mb-q24', 'md:mb-0',
    'w-full', 'md:w-3/5'
  ])};
  min-width: calc((3 / 5 * 100%) - 1.5rem);
  @media(min-width: 768px) {
    max-width: calc((3 / 5 * 100%) - 1.5rem);
  }
`

export const ColumnThreeFour = css`
  ${tw([
    'md:px-q12', 'mb-q24', 'md:mb-0',
    'w-full', 'md:w-3/4'
  ])};
  min-width: calc((3 / 4 * 100%) - 1.5rem);
  @media(min-width: 768px) {
    max-width: calc((3 / 4 * 100%) - 1.5rem);
  }
`

export const ColumnTwoFive = css`
  ${tw([
    'md:px-q12', 'mb-q24', 'md:mb-0',
    'w-full', 'md:w-2/5'
  ])};
  min-width: calc((2 / 5 * 100%) - 1.5rem);
  @media(min-width: 768px) {
    max-width: calc((2 / 5 * 100%) - 1.5rem);
  }
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