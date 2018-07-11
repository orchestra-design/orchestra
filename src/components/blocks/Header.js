/* global tw */
import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import styled from 'react-emotion'
import { lifecycle } from 'recompose'

import { any, replace, compose, view, map, equals, lensPath } from '../../helpers'

import {
  ContainerFluid, Logo, SquareButton
} from '../elements'

const HeaderContainer = styled(ContainerFluid)`
  ${tw('fixed pin-t pin-r pin-l z-50')};
`

const LangSwitcher = styled(SquareButton)`
  ${tw('absolute pin-r pin-t')};
`
const withLifecicle = lifecycle({
  state: { path: '/' },
  componentDidMount() {
    this.setState({
      path: window.location.pathname.replace(/\/$/, '')
    })
  }
})

const reverseLang = lang =>
  lang === 'ru' ? 'en' : 'ru'

export const Header = withLifecicle(({ lang, allSite, path }) => {
  const makePath = `${withPrefix(reverseLang(lang))}${path.replace(/^\/.{2}/i, '')}`
  const safePath = compose(
    any(equals(makePath)),
    map(replace(/\/$/, '')),
    map(view(lensPath(['node', 'path']))),
  )(allSite.edges)

  return (
    <HeaderContainer>
      {path.length <= 3 
        ?  <Logo primaryColor="#ffffff" />
        : <Link to={`/${lang.replace('-us', '')}`} >
          <Logo primaryColor="#ffffff" />
        </Link>
      }
      <Link to={safePath ? makePath : `/${reverseLang(lang)}`} >
        <LangSwitcher>{ reverseLang(lang) }</LangSwitcher>
      </Link>
    </HeaderContainer>
  )
})