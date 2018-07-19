/* global tw */
import React from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'
import { compose, lifecycle } from 'recompose'

import { toggleMenu } from '../../actions'
import { SquareButton } from './Buttons'

import IconMenu from '../../assets/icon-menu.svg'
import IconMenuBlack from '../../assets/icon-menu-black.svg'
import IconClose from '../../assets/icon-close.svg'

const MenuButton = styled(SquareButton)`
  ${tw([
    'flex', 'md:hidden', 
    'bg-center', 'bg-no-repeat',
    'border', 'border-black', 'border-solid',
    'cursor-pointer', 'm-q24'
  ])};
  background-image: url(${props => props.isMenu ? IconClose : IconMenu});
  transition: all .2s ease-in-out;
  &:hover {
    ${props => props.isMenu && tw(['border-white'])};
    background-image: url(${props => props.isMenu ? IconClose : IconMenuBlack});
  }
`

const enhance = compose(
  connect(
    ({ isMenu }) => ({ isMenu }),
    { toggleMenu }
  ),
  lifecycle({
    updateState() {
      this.props.isMenu && window.innerWidth > 768 && this.props.toggleMenu(false)
    },
    componentDidMount() {
      window.addEventListener('resize', this.updateState.bind(this))
      window.addEventListener('onorientationchange', this.updateState.bind(this))
    },  
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateState.bind(this))
      window.removeEventListener('onorientationchange', this.updateState.bind(this))
    },
  }),
)

export const MenuToggler = enhance(({ toggleMenu, isMenu}) => 
  <MenuButton 
    onClick={() => toggleMenu()}
    {...{isMenu}} 
  />)
