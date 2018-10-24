/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { countJumbo } from '../../actions'
import { SimpleRow } from './Grids'
import { ButtonSmallText } from './Typography'
import { LittleRoundButton } from './Buttons'

import IconUp from '../../assets/icon-up.svg'
import IconUpBlack from '../../assets/icon-up-black.svg'

const PagerRow = styled('div')`
  ${SimpleRow};
  ${ButtonSmallText};
  ${tw(['hidden', 'screen:flex', 'items-center', 'whitespace-no-wrap'])};
  color: ${({ color }) => (color ? '#000000' : '#ffffff')};
  line-height: 1.15rem;
`

const ButtonStyles = props => css`
  ${tw(['bg-transparent', 'cursor-pointer'])};
  background-image: url(${props.color ? IconUpBlack : IconUp});
  background-size: 16px 16px;
  &:hover {
    background-color: ${props.color ? '#000000' : '#ffffff'};
    background-image: url(${props.color ? IconUp : IconUpBlack});
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

const Current = styled('span')`
    ${tw([
      'mr-q8', 'pr-q12', 'relative'
    ])}
  &::after {
    content: '';
    ${tw([
      'absolute', 'block', 
      'h-q4', 'pin-r', 'pin-t', 'w-q4'
    ])};
    background: ${({ color }) => (color ? '#000000' : '#ffffff')};
    top: 0.5rem;
  }
`

export const Pager = connect(
  ({ jumboCount }) => ({ jumboCount }),
  { countJumbo }
)(({ countJumbo, jumboCount, length, color }) => {
  const decrement = jumboCount > 0 ? jumboCount - 1 : length - 1
  const increment = jumboCount < length - 1 ? jumboCount + 1 : 0

  return (
    <PagerRow color={color ? 'yep' : ''}>
      <Previous onClick={() => countJumbo(decrement)} color={color ? 'yep' : ''} />
      <Current color={color ? 'yep' : ''}>{jumboCount + 1}</Current>
      {length}
      <Next onClick={() => countJumbo(increment)} color={color ? 'yep' : ''} />
    </PagerRow>
  )
})
