/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { countJumbo } from '../../actions'
import { Current } from './Current'
import { SimpleRow } from './Grids'
import { ButtonSmallText } from './Typography'
import { LittleRoundButton } from './Buttons'

import IconUp from '../../assets/icon-up.svg'
import IconUpBlack from '../../assets/icon-up-black.svg'

const PagerRow = styled('div')`
  ${SimpleRow};
  ${ButtonSmallText};
  ${tw(['hidden', 'screen:flex', 'items-center', 'whitespace-no-wrap'])};
  color: ${({ theme }) => theme.color};
  line-height: 1.15rem;
`

const ButtonStyles = props => css`
  ${tw(['bg-transparent', 'cursor-pointer'])};
  background-image: url(${props.theme.color === '#ffffff'
    ? IconUp
    : IconUpBlack});
  background-size: 16px 16px;
  &:hover {
    background-color: ${props.theme.color === '#ffffff'
      ? '#000000'
      : '#ffffff'};
    background-image: url(${props.theme.color === '#ffffff'
      ? IconUp
      : IconUpBlack});
  }
`

const Previous = styled(LittleRoundButton)`
  ${ButtonStyles};
  transform: rotateZ(270deg);
`

const Next = styled(LittleRoundButton)`
  ${ButtonStyles};
  transform: rotateZ(90deg);
`

export const Pager = connect(
  ({ jumboCount }) => ({ jumboCount }),
  { countJumbo }
)(({ countJumbo, jumboCount, length }) => {
  const decrement = jumboCount > 0 ? jumboCount - 1 : length - 1
  const increment = jumboCount < length - 1 ? jumboCount + 1 : 0

  return (
    <PagerRow>
      <Previous onClick={() => countJumbo(decrement)} />
      <Current>{jumboCount + 1}</Current>
      {length}
      <Next onClick={() => countJumbo(increment)} />
    </PagerRow>
  )
})
