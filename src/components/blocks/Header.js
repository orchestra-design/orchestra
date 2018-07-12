/* global tw */
import React, { Fragment } from 'react'
import styled from 'react-emotion'
import { lifecycle } from 'recompose'
import Link from 'gatsby-link'

import { and, isNil, not, map, pathOr } from '../../helpers'
import {
  Button, ContainerFluid, LangSwitcher,
  HeaderLogo, SquareButton
} from '../elements'

import IconMenu from '../../assets/icon-menu.svg'
import IconMenuBlack from '../../assets/icon-menu-black.svg'

const HeaderContainer = styled(ContainerFluid)`
  ${tw([
    'absolute', 'pin-t', 'pin-r', 'pin-l', 
    'flex', 'flex-row', 'flex-no-wrap',
    'justify-between', 'items-center',
    'z-50', 
  ])};
`

const Navigaton = styled('nav')`
  ${tw([
    'hidden', 'md:flex', 'flex-no-wrap',
    'flex-col', 'screen:flex-row',
    'screen:p-q36'
  ])};
`

const LinkButton = styled(Link)`
  ${Button};
  ${tw([
    'h-q36', 'screen:h-q48',
    'mr-q36', 'px-q12'
  ])};
`

const MenuButton = styled(SquareButton)`
  ${tw([
    'flex', 'md:hidden', 
    'bg-center', 'bg-no-repeat',
    'cursor-pointer', 'm-q24'
  ])};
  background-image: url(${IconMenu});
  transition: all .2s ease-in-out;
  &:hover {
    background-image: url(${IconMenuBlack});
  }
`

const withLifecicle = lifecycle({
  state: { path: '/' },
  componentDidMount() {
    this.setState({
      path: window.location.pathname.replace(/\/$/, '')
    })
  }
})

const NavLink = ({ linktitle, link }) => (and(not(isNil(linktitle)), not(isNil(link))) && 
  <LinkButton key={linktitle} to={link.url} >{ linktitle }</LinkButton>
)
const LinksBar = ({ data }) => <Fragment>{ map(NavLink)(data) }</Fragment>

export const Header = withLifecicle(props => {
  const headerlinks = pathOr(false, ['links', 'data', 'headerlinks'], props)
  return (
  <HeaderContainer>
    <HeaderLogo {...props} />
    <Navigaton>
      { headerlinks && 
        <LinksBar data={headerlinks} />
      }
      <LangSwitcher {...props} />
    </Navigaton>
    <MenuButton />
  </HeaderContainer>
)})
