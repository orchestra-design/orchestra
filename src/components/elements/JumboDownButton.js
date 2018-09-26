/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { countJumbo } from '../../actions'
import { gt, isNil, length, unless } from '../../helpers'

import { RoundButton } from './Buttons'
import { BaseTransition } from './Transitions'

import IconUp from '../../assets/icon-up.svg'
import IconUpBlack from '../../assets/icon-up-black.svg'

const Button = styled(RoundButton)`
  ${tw([
    'absolute',
    'hidden',
    'screen:mb-q36',
    'mx-auto',
    'pin-b',
    'pin-l',
    'pin-r',
    'screen:h-q48',
    'screen:w-q48',
    'shadow-none',
    'hover:shadow-elevate1',
  ])};
  ${BaseTransition};
  ${({ jumboCount }) => unless(isNil, () => tw('screen:block'))(jumboCount)};
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

export const JumboDownButton = compose(
  connect(
    ({ jumboCount }) => ({ jumboCount }),
    { countJumbo }
  ),
  withHandlers({
    toNext: props => () => {
      const jumboCounter = document.getElementById('jumbo-counter')
      const jumboCounterChildren = Array.from(jumboCounter.children)
      const pred = gt(length(jumboCounterChildren) - 1, props.jumboCount)
      window.scrollBy(
        0,
        pred ? window.innerHeight / 2 : window.innerHeight * 0.75
      )
      props.countJumbo(pred ? props.jumboCount + 1 : null)
    },
  })
)(({ jumboCount, toNext }) => <Button onClick={toNext} {...{ jumboCount }} />)
