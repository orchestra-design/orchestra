import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux'

import { toggleMenu } from '../../actions'
import { ifElse, lengthLte } from '../../helpers'
import { Logo } from './Logo'

export const HeaderLogo = connect(
  ({ collapsedMenu, collapseTransition, isMenu }) => ({ collapsedMenu, collapseTransition, isMenu }),
  { toggleMenu }
)(({ lang, path, collapsedMenu, collapseTransition, isMenu, toggleMenu }) => (
  <Fragment>
  {ifElse(
    path => lengthLte(3, path),
    () => <Logo {...{collapsedMenu}} {...{collapseTransition}} />,
    () => <Link 
      to={`/${lang.replace('-us', '')}`}      
      onClick={() => isMenu && toggleMenu()}
    ><Logo {...{collapsedMenu}} {...{collapseTransition}} /></Link>
  )(path)}
  </Fragment>
))