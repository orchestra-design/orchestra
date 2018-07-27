/* global tw */
import styled from 'react-emotion'

import { Button } from './Buttons'
import { BaseTransition } from './Transitions'

import IconNext from '../../assets/icon-next.svg'
import IconNextBlack from '../../assets/icon-next-black.svg'

const Template = styled('span')`
  ${Button};
  ${tw([
    'flex', 'cursor-pointer', 'bg-center', 
    'bg-transparent', 'hover:bg-black',
    'bg-no-repeat', 'h-q36', 'w-q72',
    'shadow-none', 'hover:shadow-elevate1',
  ])};
  ${BaseTransition};
  background-image: url(${IconNext});
  background-size: 36px 20px;
  @media(min-width: 601px) {
    background-size: 40x 24px;
  }
  &:hover {
    background-image: url(${IconNext});
  }
`

export const NextButton = styled(Template)`
  @media(min-width: 601px) {
    background-image: url(${IconNextBlack});
  }
`

export const PreviousButton = styled(Template)`
  transform: rotateZ(180deg);
`