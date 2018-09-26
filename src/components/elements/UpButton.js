/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { RoundButton } from './Buttons'
import { BaseTransition } from './Transitions'

import IconUp from '../../assets/icon-up.svg'
import IconUpBlack from '../../assets/icon-up-black.svg'

const Button = styled(RoundButton)`
  ${tw([
    'fixed',
    'border',
    'border-solid',
    'hidden',
    'm-q24',
    'mb-q72',
    'screen:mb-q80',
    'pin-b',
    'pin-r',
    'screen:h-q48',
    'screen:w-q48',
    'shadow-none',
    'hover:shadow-elevate1',
  ])};
  ${({ hiddenDown }) => hiddenDown && tw(['flex'])};
  ${({ isMenu }) => isMenu && tw(['hidden'])};
  ${BaseTransition};
  background-image: url(${({ theme }) =>
    theme.color === '#ffffff' ? IconUp : IconUpBlack});
  background-size: 20px 20px;
  border-color: ${({ theme }) => theme.color};
  @media (min-width: 601px) {
    background-size: 24px 24px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color};
    background-image: url(${({ theme }) =>
      theme.color === '#ffffff' ? IconUpBlack : IconUp});
  }
`

export const UpButton = compose(
  connect(({ hiddenDown, isMenu }) => ({
    hiddenDown,
    isMenu,
  })),
  withHandlers({
    toTop: () => () => {
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
    },
  })
)(({ hiddenDown, isMenu, toTop }) => (
  <Button onClick={toTop} {...{ hiddenDown }} {...{ isMenu }} />
))
