/* global tw */
import styled, { css } from 'react-emotion'

import { ButtonText } from './Typography'

export const Button = css`
  ${ButtonText};
  ${tw([
    'flex', 'justify-center', 'items-center', 
    'no-underline', 'text-white', 'hover:text-black',
    'bg-black', 'hover:bg-white',
    'shadow-none', 'hover:shadow-elevate1',
    'active:shadow-elevate0', 'focus:shadow-elevate0'
  ])};
  transition-property: background, color, shadow, heigth, width, font-size, margin-right;
  transition-duration: .2s, .2s, .2s, 0s, 0s, 0s, 0s;
  transition-timing-function: ease-in-out;
`

export const SquareButton = styled('span')`
  ${Button};
  ${tw([
    'w-q36', 'h-q36', 'flex-no-shrink'
  ])};
`
