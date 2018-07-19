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
    'hidden', 'screen:flex',
    'm-q36', 'desktop:q36',
    'pin-b', 'pin-r',
    'shadow-none', 'hover:shadow-elevate1'
  ])};
  ${BaseTransition};
  background-color: ${({ theme }) => theme.color};
  background-image: url(${({ theme }) => theme.color === '#ffffff' ? IconContactStrokeBlack : IconContactStroke});
  background-size: 20px 20px;
  &:hover {
    background-image: url(${({ theme }) => theme.color === '#ffffff' ? IconContactBlack : IconContact});
  }
`
