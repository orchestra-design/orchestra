/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'

import {
  ContainerFluid, 
  HeaderLogo, MenuToggler
} from '../elements'

import { HeaderNavigation } from './HeaderNavigation'

const HeaderContainer = styled(ContainerFluid)`
  ${tw([
    'absolute', 'pin-t', 'pin-r', 'pin-l', 
    'flex', 'flex-row', 'flex-wrap',
    'justify-between', 'items-center', 'z-50', 
  ])};
  ${props => props.isMenu && 
    tw(['pin-b', 'flex-col', 'justify-stretch', 'items-stretch'])
  };
`

const MobileHeader = styled('div')`
  ${tw([ 
    'flex', 'flex-row', 'flex-no-wrap',
    'justify-between', 'items-center',
    'w-full', 'md:w-auto',
  ])};
  @media(max-width: 768px) {
    background-color: ${props => props.isMenu && '#000000'};
  }
`

const withLifecicle = compose(
  connect(({ isMenu }) => ({ isMenu })),
  lifecycle({
    state: { path: '/' },
    componentDidMount() {
      this.setState({
        path: window.location.pathname.replace(/\/$/, '')
      })
    }
  })
)

export const Header = withLifecicle(props => {
  const { isMenu } = props
  return (
  <HeaderContainer {...{isMenu}} >
    <MobileHeader {...{isMenu}} >
      <HeaderLogo {...props} />
      <MenuToggler />
    </MobileHeader>
    <HeaderNavigation {...props} />
  </HeaderContainer>
)})
