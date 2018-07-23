/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'

import { changeTheme, countJumbo } from '../../actions'
import { camelCase, equals, length, not } from '../../helpers'
import { ButtonText } from './Typography'

const Container = styled('div')`
  ${tw([
    'flex', 'h-screen'
  ])};
  transition: all .6s ease-in-out;
`

const Caption = styled('div')`
  ${ButtonText}
  ${tw([
    'invisible', 'screen:visible',
    'fixed', 'pin-b', 'pin-l',
    'p-q24', 'z-10'
  ])};
  color: ${({theme}) => theme.color};
`

const enhance = compose(
  connect(
    ({ 
      hiddenMenu, jumboCount, storedTheme 
    }) => ({ 
      hiddenMenu, jumboCount, storedTheme 
    }),
    { changeTheme, countJumbo }
  ),
  lifecycle({
    state: {},
    componentDidMount() {
      const intervalId = setInterval(() => {
        this.props.countJumbo(
          equals(this.props.jumboCount, length(this.props.image) - 1) 
            ? 0 
            : this.props.jumboCount + 1
        )
      }, 6000)
      this.setState({ intervalId: intervalId })
    },
    componentWillUnmount() {
      clearInterval(this.state.intervalId)
    }
  })
)

export const TickSlider = enhance(({ changeTheme, image, hiddenMenu, jumboCount, storedTheme }) => {
  // Theme
  const newTheme = camelCase(image[jumboCount].theme)
  not(hiddenMenu) && not(equals(newTheme, storedTheme)) && changeTheme(newTheme)
  
  return (
  <Container>
  {not(hiddenMenu) &&
    <Caption>{ image[jumboCount].caption }</Caption>  
  } 
  </Container>
)})
