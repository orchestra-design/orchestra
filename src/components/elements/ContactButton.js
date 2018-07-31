/* global tw */
import styled from 'react-emotion'

import { RoundButton } from './Buttons'
import { BaseTransition } from './Transitions'

import IconContact from '../../assets/icon-contact.svg'
import IconContactBlack from '../../assets/icon-contact-black.svg'
import IconContactStroke from '../../assets/icon-contact-stroke.svg'
import IconContactStrokeBlack from '../../assets/icon-contact-stroke-black.svg'

export const ContactButton = styled(RoundButton)`
  ${tw([
    'absolute',
    'hidden', 'md:flex',
    'md:m-q36', 'pin-b', 'pin-r',
    'screen:h-q48', 'screen:w-q48',
    'shadow-none', 'hover:shadow-elevate1',
  ])};
  ${({ isMenu }) => isMenu && tw(['m-q12'])};
  ${BaseTransition};
  background-color: ${({ theme }) => theme.color};
  background-image: url(${({ theme }) => theme.color === '#ffffff' ? IconContactStrokeBlack : IconContactStroke});
  background-size: 20px 20px;
  @media(min-width: 601px) {
    background-size: 24px 24px;
  }
  @media(max-width: 768px) {
    display: ${({ isMenu }) => isMenu && 'flex'};
  }
  &:hover {
    background-image: url(${({ theme }) => theme.color === '#ffffff' ? IconContactBlack : IconContact});
  }
`
