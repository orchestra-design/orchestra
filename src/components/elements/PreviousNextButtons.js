/* global tw */
import styled from 'react-emotion'

import { includes } from '../../helpers'

import { Button } from './Buttons'
import { BaseTransition } from './Transitions'

import IconNext from '../../assets/icon-next.svg'
import IconNextBlack from '../../assets/icon-next-black.svg'

export const PrevNextTemplate = styled('span')`
  ${tw([
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'cursor-pointer',
    'h-full',
    'w-1/3'
  ])};
  &::after {
    ${Button};
    ${tw([
      'flex',
      'bg-center',
      'bg-transparent',
      'hover:bg-black',
      'bg-no-repeat',
      'h-q36',
      'w-q72',
      'shadow-none',
      'hover:shadow-elevate1',
    ])};
    ${BaseTransition};
    content: '';
    background-image: url(${IconNext});
    background-size: 36px 20px;
    @media (min-width: 601px) {
      background-size: 40x 24px;
    }
  }
  &:hover::after {
    ${tw([
      'bg-black',
      'shadow-elevate1',
    ])};
    background-image: url(${IconNext});
  }
`

export const NextButton = styled(PrevNextTemplate)`
  &::after {
    ${tw('self-end')};
    background-image: url(${({ storedTheme }) => includes('white', storedTheme) ? IconNextBlack : IconNext});
    @media (min-width: 601px) {
      background-image: url(${({ storedTheme }) => includes('image', storedTheme) ? IconNext : IconNextBlack});
    }
  }
`

export const PreviousButton = styled(PrevNextTemplate)`
  &::after {
    ${tw('self-start')};
    background-image: url(${({ storedTheme }) => includes('white', storedTheme) ? IconNextBlack : IconNext});
    transform: rotateZ(180deg);
  }
`
