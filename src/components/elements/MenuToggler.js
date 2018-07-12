/* global tw */
import React from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'

import { toggleMenu } from '../../actions'
import { SquareButton } from '../elements'

import IconMenu from '../../assets/icon-menu.svg'
import IconMenuBlack from '../../assets/icon-menu-black.svg'
import IconClose from '../../assets/icon-close.svg'
import IconCloseBlack from '../../assets/icon-close-black.svg'

const MenuButton = styled(SquareButton)`
  ${tw([
    'flex', 'md:hidden', 
    'bg-center', 'bg-no-repeat',
    'cursor-pointer', 'm-q24'
  ])};
  background-image: url(${props => props.isMenu ? IconClose : IconMenu});
  transition: all .2s ease-in-out;
  &:hover {
    background-image: url(${props => props.isMenu ? IconCloseBlack : IconMenuBlack});
  }
`
export const MenuToggler = connect(
  ({ isMenu }) => ({ isMenu }),
  { toggleMenu }
)(({ toggleMenu, isMenu}) => <MenuButton onClick={() => toggleMenu()} isMenu={isMenu} />)
