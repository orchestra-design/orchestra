/* global tw */
import React, { Fragment } from 'react'
import styled from 'react-emotion'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import Link from 'gatsby-link'

import { and, isNil, not, map, pathOr } from '../../helpers'
import {
  Button, ContainerFluid, LangSwitcher,
  HeaderLogo, SquareButton
} from '../elements'

import IconMenu from '../../assets/icon-menu.svg'
import IconMenuBlack from '../../assets/icon-menu-black.svg'
import IconClose from '../../assets/icon-close.svg'
import IconCloseBlack from '../../assets/icon-close-black.svg'

const HeaderContainer = styled(ContainerFluid)`
  ${tw([
    'absolute', 'pin-t', 'pin-r', 'pin-l', 
    'flex', 'flex-row', 'flex-wrap',
    'justify-between', 'items-center',
    'z-50', 
  ])};
`

const MobileHeader = styled('div')`
  ${tw([ 
    'flex', 'flex-row', 'flex-no-wrap',
    'justify-between', 'items-center',
    'w-full', 'md:w-auto',
  ])};
  @media(max-width: 768px) {
    background-color: ${props => props.isMenu && '#000000'}
  }
`

const Navigaton = styled('nav')`
  ${tw([
    'bg-black', 'md:bg-transparent',
    'hidden', 'md:flex', 'flex-no-wrap',
    'flex-col', 'md:flex-row',
    'justify-center', 'items-stretch',
    'w-full', 'md:w-auto',
    'p-q36',
  ])};
  display: ${props => props.isMenu && 'flex'};
`

const LinkButton = styled(Link)`
  ${Button};
  ${tw([
    'h-q36', 'screen:h-q48',
    'mb-q36', 'md:mb-0',
    'mr-0', 'md:mr-q36', 'px-q12',
    'border-white', 'border',
    'border-solid', 'md:border-none'
  ])};
`

const MenuButton = styled(SquareButton)`
  ${tw([
    'flex', 'md:hidden', 
    'bg-center', 'bg-no-repeat',
    'cursor-pointer', 'm-q24'
  ])};
  background-image: url(${props => props.isMenu ? IconClose : IconMenu});
  transition: all .2s ease-in-out;
  &:hover {
    background-image: url(${props => props.isMenu ? IconCloseBlack : IconMenuBlack});
  }
`

const withLifecicle = compose(
  withState('isMenu', 'toggleMenu', false),
  withHandlers({
    clickHandle: ({ toggleMenu }) => () => toggleMenu((current) => !current)
  }),
  lifecycle({
    state: { path: '/' },
    componentDidMount() {
      this.setState({
        path: window.location.pathname.replace(/\/$/, '')
      })
    }
  })
)

const NavLink = ({ linktitle, link }) => (and(not(isNil(linktitle)), not(isNil(link))) && 
  <LinkButton key={linktitle} to={link.url} >{ linktitle }</LinkButton>
)
const LinksBar = ({ data }) => <Fragment>{ map(NavLink)(data) }</Fragment>

export const Header = withLifecicle(props => {
  const headerlinks = pathOr(false, ['links', 'data', 'headerlinks'], props)

  return (
  <HeaderContainer>
    <MobileHeader isMenu={props.isMenu} >
      <HeaderLogo {...props} />
      <MenuButton onClick={props.clickHandle} isMenu={props.isMenu} />
    </MobileHeader>
    <Navigaton isMenu={props.isMenu} >
      { headerlinks && 
        <LinksBar data={headerlinks} />
      }
      <LangSwitcher {...props} />
    </Navigaton>
  </HeaderContainer>
)})
