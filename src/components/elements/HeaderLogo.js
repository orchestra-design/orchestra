/* global tw */
import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux'
import styled from 'react-emotion'

import { pageTransition } from '../../actions'
import { ifElse, lengthLte, constant } from '../../helpers'
import { Logo } from './Logo'

const LogoWrapper = styled('div')`
  ${tw(['ml-q12'])};
  height: 69px;
  width: 186px;
  min-height: 69px;
  min-width: 186px;
`

export const HeaderLogo = connect(
  constant,
  { pageTransition }
)(({ lang, path, pageTransition }) => (
  <Fragment>
    {ifElse(
      path => lengthLte(3, path),
      () => (
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      ),
      () => (
        <Link to={`/${lang.replace('-us', '')}`} onClick={pageTransition}>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </Link>
      )
    )(path)}
  </Fragment>
))
