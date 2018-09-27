/* global tw */
import React from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'
import { compose, lifecycle } from 'recompose'

import { setMedia, toggleMenu } from '../../actions'
import { SquareButton } from './Buttons'

import IconMenu from '../../assets/icon-menu.svg'
import IconMenuBlack from '../../assets/icon-menu-black.svg'
import IconClose from '../../assets/icon-close.svg'
import { pick } from '../../helpers'

const MenuButton = styled(SquareButton)`
  ${tw([
    'flex',
    'md:hidden',
    'bg-center',
    'bg-no-repeat',
    'border',
    'border-solid',
    'cursor-pointer',
    'mr-q24',
  ])};
  background-image: url(${({ isMenu }) => (isMenu ? IconClose : IconMenu)});
  border-color: ${({ isMenu, theme }) =>
    isMenu ? '#ffffff' : theme.borderColor};
  transition: all 0.2s ease-in-out;
  &:hover {
    background-image: url(${({ isMenu }) =>
      isMenu ? IconClose : IconMenuBlack});
  }
`

const enhance = compose(
  connect(
    pick(['isMenu', 'isMobile']),
    { setMedia, toggleMenu }
  ),
  lifecycle({
    updateState() {
      this.props.isMenu &&
        window.innerWidth > 768 &&
        this.props.toggleMenu(false)
      window.innerWidth > 768
        ? this.props.isMobile && this.props.setMedia(false)
        : !this.props.isMobile && this.props.setMedia(true)
    },
    componentDidMount() {
      window.innerWidth > 768
        ? this.props.isMobile && this.props.setMedia(false)
        : !this.props.isMobile && this.props.setMedia(true)
      window.addEventListener('resize', this.updateState.bind(this))
      window.addEventListener(
        'onorientationchange',
        this.updateState.bind(this)
      )
    },
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateState.bind(this))
      window.removeEventListener(
        'onorientationchange',
        this.updateState.bind(this)
      )
    },
  })
)

export const MenuToggler = enhance(({ toggleMenu, isMenu }) => (
  <MenuButton onClick={() => toggleMenu()} {...{ isMenu }} />
))
