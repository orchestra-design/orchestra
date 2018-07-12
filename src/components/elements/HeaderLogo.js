import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux'

import { toggleMenu } from '../../actions'
import { length, lte, ifElse } from '../../helpers'
import { Logo } from './Logo'

export const HeaderLogo = connect(
  ({ isMenu }) => ({ isMenu }),
  { toggleMenu }
)(({ lang, path, isMenu, toggleMenu }) => (
  <Fragment>
  {ifElse(
    path => lte(length(path), 3),
    () => <Logo />,
    () => <Link 
      to={`/${lang.replace('-us', '')}`}      
      onClick={() => isMenu && toggleMenu()}
    ><Logo /></Link>
  )(path)}
  </Fragment>
))