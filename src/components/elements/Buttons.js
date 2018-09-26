/* global tw */
import styled, { css } from 'react-emotion'

import { BaseTransition } from './Transitions'
import { ButtonText } from './Typography'

export const Button = css`
  ${ButtonText};
  ${tw([
    'cursor-pointer',
    'flex',
    'justify-center',
    'items-center',
    'no-underline',
    'text-white',
    'bg-black',
    'shadow-none',
    'hover:shadow-elevate1',
    'active:shadow-elevate0',
    'focus:shadow-elevate0',
  ])};
  transition-property: background, color, shadow, heigth, width, font-size,
    margin-right;
  transition-duration: 0.2s, 0.2s, 0.2s, 0s, 0s, 0s, 0s;
  transition-timing-function: ease-in-out;
`

export const RoundButton = styled('span')`
  ${tw([
    'bg-center',
    'bg-no-repeat',
    'cursor-pointer',
    'flex-no-shrink',
    'h-q36',
    'w-q36',
  ])};
  ${BaseTransition};
  border-radius: 50%;
`

export const LittleRoundButton = styled('span')`
  ${tw([
    'bg-center',
    'bg-no-repeat',
    'flex-no-shrink',
    'h-q24',
    'w-q24',
    'shadow-none',
    'hover:shadow-elevate1',
    'active:shadow-elevate0',
    'focus:shadow-elevate0',
  ])};
  ${BaseTransition};
  border-radius: 50%;
`

export const SquareButton = styled('span')`
  ${Button};
  ${tw(['w-q36', 'h-q36', 'flex-no-shrink'])};
`
