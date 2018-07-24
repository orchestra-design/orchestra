/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { changeTheme } from '../../actions'
import { offset, pathOr, delay } from '../../helpers'

import { RoundButton } from './Buttons'
import { BaseTransition } from './Transitions'

import IconUp from '../../assets/icon-up.svg'
import IconUpBlack from '../../assets/icon-up-black.svg'

const Button = styled(RoundButton)`
  ${tw([
    'absolute', 'hidden', 'md:mb-q36', 'mx-auto', 'pin-b', 
    'pin-l', 'pin-r', 'md:h-q48', 'md:w-q48',
    'shadow-none', 'hover:shadow-elevate1',
  ])};
  ${BaseTransition};
  ${({ hiddenDown, hiddenMenu }) => !hiddenDown && !hiddenMenu && tw('md:block')};
  background-image: url(${({ theme }) => theme.color === '#ffffff' ? IconUp : IconUpBlack});
  background-size: 24px 24px;
  transform: rotateZ(180deg);
  @media(min-width: 601px) {
  }
  &:hover {
    background-color: ${({ theme }) => theme.logoFill};
    background-image: url(${({ theme }) => theme.logoFill === '#ffffff' ? IconUpBlack : IconUp});
  }
`

export const DownButton = compose(
  connect(
    ({ hiddenMenu }) => ({ hiddenMenu }),
    { changeTheme }
  ),
  withHandlers({
    toNext: props => () => {
      const scrollContainer = document.getElementById('scroll-container')
      scrollContainer.scrollTop = offset(scrollContainer).height
      const scrollChildren = Array.from(scrollContainer.children)
      
      delay(500, () => { 
        props.changeTheme(
          pathOr('white', ['attributes', 'theme', 'value'], scrollChildren[1])
        )        
      })
    }
  })
)(({ hiddenDown, hiddenMenu, toNext }) => (
  <Button 
    onClick={toNext} 
    {...{hiddenDown}}
    {...{hiddenMenu}}
  />
))
