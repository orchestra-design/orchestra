/* global tw */
import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import styled from 'react-emotion'
import { lifecycle } from 'recompose'

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

export const Header = withLifecicle(({ lang, path }) => (
  <HeaderContainer>
    {path.length <= 3 
      ?  <Logo primaryColor="#ffffff" />
      : <Link to={`/${lang.replace('-us', '')}`} >
        <Logo primaryColor="#ffffff" />
      </Link>
    }
    <Link to={`${withPrefix(reverseLang(lang))}${path.replace(/^\/.{2}/i, '')}`} >
      <LangSwitcher>{ reverseLang(lang) }</LangSwitcher>
    </Link>
  </HeaderContainer>
))