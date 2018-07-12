import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux'

import { toggleMenu } from '../../actions'
import { ifElse, lengthLte } from '../../helpers'
import { Logo } from './Logo'

export const HeaderLogo = connect(
  ({ collapsedMenu, isMenu }) => ({ collapsedMenu, isMenu }),
  { toggleMenu }
)(({ lang, path, collapsedMenu, isMenu, toggleMenu }) => (
  <Fragment>
  {ifElse(
    path => lengthLte(3, path),
    () => <Logo {...{collapsedMenu}} />,
    () => <Link 
      to={`/${lang.replace('-us', '')}`}      
      onClick={() => isMenu && toggleMenu()}
    ><Logo {...{collapsedMenu}} /></Link>
  )(path)}
  </Fragment>
))