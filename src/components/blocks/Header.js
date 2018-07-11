/* global tw */
import React from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import { lifecycle } from 'recompose'

import {
  ContainerFluid, LangSwitcher,
  Logo
} from '../elements'

const HeaderContainer = styled(ContainerFluid)`
  ${tw('fixed pin-t pin-r pin-l z-50')};
`

const withLifecicle = lifecycle({
  state: { path: '/' },
  componentDidMount() {
    this.setState({
      path: window.location.pathname.replace(/\/$/, '')
    })
  }
})


export const Header = withLifecicle(({ lang, allSite, path }) => {

  return (
    <HeaderContainer>
      {path.length <= 3 
        ?  <Logo primaryColor="#ffffff" />
        : <Link to={`/${lang.replace('-us', '')}`} >
          <Logo primaryColor="#ffffff" />
        </Link>
      }
      <LangSwitcher 
        {...{lang}} 
        {...{allSite}} 
        {...{path}} 
      />
    </HeaderContainer>
  )
})