/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'

import {
  ContainerFluid, 
  HeaderLogo, MenuToggler
} from '../elements'

import { HeaderNavigation } from './HeaderNavigation'

const HeaderContainerDynamicStyle = ({ collapsedMenu, hiddenMenu, isMenu }) => css`
  ${isMenu && 
    tw(['pin-b', 'flex-col', 'justify-stretch', 'items-stretch'])
  };
  transform: translateY(${collapsedMenu ? '0%' : hiddenMenu ? '-100%' : '0%'});
`

const HeaderContainer = styled(ContainerFluid)`
  ${tw([
    'absolute', 'pin-t', 'pin-r', 'pin-l', 
    'flex', 'flex-row', 'flex-wrap',
    'justify-between', 'items-center', 'z-50', 
  ])};  
  ${HeaderContainerDynamicStyle};
  transition: transform .4s ease-in-out;
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
  connect(({ collapsedMenu, hiddenMenu, isMenu  }) => ({ collapsedMenu, hiddenMenu, isMenu  })),
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
  const { collapsedMenu, hiddenMenu, isMenu } = props
  
  return (
  <HeaderContainer
    {...{collapsedMenu}}
    {...{hiddenMenu}}
    {...{isMenu}}
  >
    <MobileHeader {...{isMenu}} >
      <HeaderLogo {...props} />
      <MenuToggler />
    </MobileHeader>
    <HeaderNavigation {...props} />
  </HeaderContainer>
)})
