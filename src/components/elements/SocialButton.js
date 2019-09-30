/* global tw */
import styled from 'react-emotion'

import { RoundButton } from './Buttons'

import facebook from '../../assets/icon-facebook.svg'
import facebookBlack from '../../assets/icon-facebook-black.svg'
import instagram from '../../assets/icon-instagram.svg'
import vk from '../../assets/icon-vk.svg'
import instagramBlack from '../../assets/icon-instagram-black.svg'
import vkBlack from '../../assets/icon-vk-black.svg'

const iconByType = {
  facebook,
  instagram,
  vk,
}

const iconBlackByType = {
  facebook: facebookBlack,
  instagram: instagramBlack,
  vk: vkBlack,
}

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
  background-image: url(${({ linktype }) => iconBlackByType[linktype]});
  border-color: ${({ theme }) => theme.color};
  &:hover {
    background-image: url(${({ linktype }) => iconByType[linktype]});
  }
`
