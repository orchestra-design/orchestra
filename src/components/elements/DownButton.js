/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { pick } from '../../helpers'

import { RoundButton } from './Buttons'
import { BaseTransition } from './Transitions'

import IconUp from '../../assets/icon-up.svg'
import IconUpBlack from '../../assets/icon-up-black.svg'

const Button = styled(RoundButton)`
  ${tw([
    'fixed',
    'hidden',
    'md:mb-q24',
    'mx-auto',
    'pin-b',
    'pin-l',
    'pin-r',
    'md:h-q48',
    'md:w-q48',
    'shadow-none',
    'hover:shadow-elevate1',
    'z-40',
  ])};
  ${BaseTransition};
  ${({ hiddenDown, notDown }) => !hiddenDown && !notDown && tw('md:block')};
  background-image: url(${({ theme }) =>
    theme.color === '#ffffff' ? IconUp : IconUpBlack});
  background-size: 24px 24px;
  transform: rotateZ(180deg);
  @media (min-width: 601px) {
  }
  &:hover {
    background-color: ${({ theme }) => theme.logoFill};
    background-image: url(${({ theme }) =>
      theme.logoFill === '#ffffff' ? IconUpBlack : IconUp});
  }
`

export const DownButton = compose(
  connect(pick(['hiddenDown'])),
  withHandlers({
    toNext: () => () => {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      })
    },
  })
)(({ hiddenDown, notDown, toNext }) => (
  <Button onClick={toNext} {...{ hiddenDown }} {...{ notDown }} />
))
