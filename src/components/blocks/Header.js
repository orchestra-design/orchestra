/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { compose, lifecycle, pure } from 'recompose'
import { connect } from 'react-redux'

import {
  ContainerFluid,
  HeaderBreadcrumbs,
  HeaderLogo,
  MenuToggler,
} from '../elements'
import { HeaderNavigation } from './HeaderNavigation'
import { toRGBA } from '../../helpers'

const Fader = styled('div')`
  ${tw(['absolute', 'h-q64', 'pin-l', 'pin-r', 'pin-t'])};
  z-index: -1;
  transition: all 0.6s ease-in-out;
  background-color: ${({ color, theme }) =>
    theme.backgroundColor
      ? toRGBA(1)(theme.backgroundColor)
      : toRGBA(1)(color)};
  box-shadow: 0 0 1.5rem 1rem
    ${({ color, theme }) =>
      theme.backgroundColor
        ? toRGBA(1)(theme.backgroundColor)
        : toRGBA(1)(color)};
`

const HeaderContainerDynamicStyle = ({ isMenu }) => css`
  @media (max-width: 768px) {
    ${isMenu && tw(['pin-b', 'flex-col', 'justify-stretch', 'items-stretch'])};
  }
`

const HeaderContainer = styled(ContainerFluid)`
  ${tw([
    'absolute',
    'pin-t',
    'pin-l',
    'flex',
    'flex-row',
    'flex-wrap',
    'screen:flex-no-wrap',
    'items-center',
    'justify-between',
    'overflow-hidden',
    'pb-q24',
    'z-50',
  ])};
  ${HeaderContainerDynamicStyle};
  width: calc(100% - 14px);
`

const MobileHeader = styled('div')`
  ${tw([
    'flex',
    'flex-row',
    'flex-wrap',
    'md:flex-no-wrap',
    'justify-between',
    'items-center',
    'w-full',
    'md:w-auto',
  ])};
  @media (max-width: 768px) {
    background-color: ${props => props.isMenu && '#000000'};
  }
`

const withLifecicle = compose(
  connect(({ isMenu }) => ({
    isMenu,
  })),
  pure,
  lifecycle({
    state: { path: '/' },
    componentDidMount() {
      this.setState({
        path: window.location.pathname.replace(/\/$/, ''),
      })
    },
  })
)

export const Header = withLifecicle(props => {
  const { color, isMenu, title } = props

  return (
    <HeaderContainer {...{ isMenu }}>
      <Fader {...{ color }} />
      <MobileHeader {...{ isMenu }}>
        <HeaderLogo {...props} />
        <HeaderBreadcrumbs {...{ isMenu }} {...{ title }} />
        <MenuToggler />
      </MobileHeader>
      <HeaderNavigation {...props} />
    </HeaderContainer>
  )
})
