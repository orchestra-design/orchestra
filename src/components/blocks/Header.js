/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { compose, lifecycle, pure } from 'recompose'
import { connect } from 'react-redux'

import { ContainerFluid, HeaderLogo, MenuToggler } from '../elements'
import { HeaderNavigation } from './HeaderNavigation'
import { toRGBA } from '../../helpers'

const HeaderContainerDynamicStyle = ({ color, isMenu, theme }) => css`
  @media (max-width: 768px) {
    ${isMenu &&
      tw([
        'bg-black',
        'flex-col',
        'justify-stretch',
        'items-stretch',
        'max-h-screen',
      ])};
  }
  background-color: ${theme.backgroundColor
    ? toRGBA(1)(theme.backgroundColor)
    : color
      ? toRGBA(1)(color)
      : 'trasparent'};
`

const HeaderContainer = styled(ContainerFluid)`
  ${tw([
    'fixed',
    'flex',
    'flex-row',
    'flex-wrap',
    'screen:flex-no-wrap',
    'items-center',
    'justify-between',
    'md:pb-0',
    'overflow-hidden',
    'w-auto',
    'z-50',
  ])};
  top: 0;
  left: 0;
  right: 0;
  ${HeaderContainerDynamicStyle};
  transition: all 600ms ease-in-out;
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
  const { color, isMenu } = props

  return (
    <HeaderContainer {...{ color }} {...{ isMenu }}>
      <MobileHeader {...{ isMenu }}>
        <HeaderLogo {...props} />
        <MenuToggler />
      </MobileHeader>
      <HeaderNavigation {...props} />
    </HeaderContainer>
  )
})
