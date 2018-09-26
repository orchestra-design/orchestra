/* global tw */
import styled from 'react-emotion'

import { RoundButton } from './Buttons'

import facebook from '../../assets/icon-facebook.svg'
import facebookBlack from '../../assets/icon-facebook-black.svg'
import instagram from '../../assets/icon-instagram.svg'
import instagramBlack from '../../assets/icon-instagram-black.svg'

export const SocialButton = styled(RoundButton)`
  ${tw([
    'bg-white',
    'hover:bg-black',
    'ml-q12',
    'screen:ml-q8',
    'border',
    'border-solid',
    'screen:h-q48',
    'screen:w-q48',
  ])};
  background-image: url(${({ linktype }) =>
    linktype === 'facebook'
      ? facebookBlack
      : linktype === 'instagram'
        ? instagramBlack
        : null});
  border-color: ${({ theme }) => theme.color};
  &:hover {
    background-image: url(${({ linktype }) =>
      linktype === 'facebook'
        ? facebook
        : linktype === 'instagram'
          ? instagram
          : null});
  }
`
