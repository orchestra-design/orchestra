/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'

import { changeTheme, countJumbo } from '../../actions'
import { camelCase, equals, length, not } from '../../helpers'

import { SimpleRow } from './Grids'
import { JustImage } from './JustImage'
import { Pager } from './Pager'
import { ButtonText, Heading1 } from './Typography'

const Container = styled('div')`
  ${tw([
    'flex', 'flex-col', 'justify-end',
    'mx-auto', 'max-w-desktop', 'relative'
  ])};
  @media(max-width: 599px) {
    height: 100vw;
  }
  @media(min-width: 600px) {
    height: calc(100vh - 9rem);
  }
`
const Heading =  styled('h1')`
  ${Heading1};
  ${tw([
    'max-w-xs', 'screen:max-w-sm',
    'pb-q48', 'pl-q24', 'screen:pb-0',
    'relative'
  ])};
  color: ${({theme}) => theme.logoFill};
  text-shadow: ${({ theme }) => theme.logoShadow && '0 0 1.5rem rgba(0,0,0,0.24)'};
`

const Caption = styled('div')`
  ${ButtonText};
  ${SimpleRow}
  ${tw([
    'screen:fixed', 'items-center',
    'pin-b', 'pin-l', 'p-q24', 
    'z-10'
  ])};
  color: ${({theme}) => theme.color};
`

const enhance = compose(
  connect(
    ({ 
      hiddenMenu, isMenu, jumboCount, storedTheme 
    }) => ({ 
      hiddenMenu, isMenu, jumboCount, storedTheme 
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

export const TickSlider = enhance(({ 
  changeTheme, image, isMenu, 
  hiddenMenu, jumboCount, storedTheme 
}) => {
  // Theme
  const newTheme = camelCase(image[jumboCount].theme)
  not(isMenu) && not(hiddenMenu) && not(equals(newTheme, storedTheme)) && changeTheme(newTheme)
  
  return (
  <Container>
    <div className={css`${tw('absolute pin screen:hidden')}`} >
      <JustImage image={image[jumboCount].image} />
    </div>
    <Heading>{ image[jumboCount].worktitle.text }</Heading>
    {not(hiddenMenu) &&
      <Caption>
        <Pager length={length(image)} />
        { image[jumboCount].caption }
      </Caption>
    } 
  </Container>
)})
