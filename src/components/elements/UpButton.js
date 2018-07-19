/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { changeTheme } from '../../actions'
import { head, pathOr } from '../../helpers'

import { RoundButton } from './Buttons'
import { BaseTransition } from './Transitions'

import IconUp from '../../assets/icon-up.svg'
import IconUpBlack from '../../assets/icon-up-black.svg'

const Button = styled(RoundButton)`
  ${tw([
    'absolute', 'border', 'border-solid', 
    'hidden', 'm-q24', 'md:m-q36',
    'md:mb-q96', 'pin-b', 'pin-r',
    'screen:h-q48', 'screen:w-q48',
    'shadow-none', 'hover:shadow-elevate1',
  ])};
  ${({ collapsedMenu }) => collapsedMenu && tw(['flex'])};
  ${({ isMenu }) => isMenu && tw(['hidden'])};
  ${BaseTransition};
  background-image: url(${({ theme }) => theme.color === '#ffffff' ? IconUp : IconUpBlack});
  background-size: 20px 20px;
  border-color: ${({ theme }) => theme.color};
  @media(min-width: 601px) {
    background-size: 24px 24px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color};
    background-image: url(${({ theme }) => theme.color === '#ffffff' ? IconUpBlack : IconUp});
  }
`

export const UpButton = compose(
  connect(
    ({ 
      collapsedMenu, isMenu 
    }) => ({
      collapsedMenu, isMenu 
    }),
    { changeTheme }
  ),
  withHandlers({
    toTop: props => () => {
      const scrollContainer = document.getElementById('scroll-container')
      const scrollChildren = Array.from(scrollContainer)
      scrollContainer.scrollTop = 0
      props.changeTheme(
        pathOr('white', ['attributes', 'theme', 'value'], head(scrollChildren))
      )
    }
  })
)(({ collapsedMenu, isMenu, toTop }) => (
  <Button 
    onClick={toTop} 
    {...{collapsedMenu}} 
    {...{isMenu}}
  />
))
