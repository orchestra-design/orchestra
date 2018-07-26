/* global tw */
import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux'
import styled from 'react-emotion'

import { pageTransition } from '../../actions'
import { ifElse, lengthLte } from '../../helpers'
import { Logo } from './Logo'

const LogoWrapper = styled('div')`
  ${tw(['ml-q12'])};
  height: 69px;
  width: 186px;
  width: ${({ collapsedMenu, collapseTransition }) => !collapsedMenu && !collapseTransition && 'calc(186px + 135 * ((100vw - 320px) / 1280))'};
  height: ${({ collapsedMenu, collapseTransition }) => !collapsedMenu && !collapseTransition && 'calc(69px + 43 * ((100vw - 320px) / 1280))'};
  min-height: 69px;
  min-width: 186px;
`

export const HeaderLogo = connect(
  ({ 
    collapsedMenu, collapseTransition 
  }) => ({ 
    collapsedMenu, collapseTransition 
  }),
  { pageTransition }
)(({ 
  lang, path, collapsedMenu, collapseTransition, 
  pageTransition, 
}) => (
  <Fragment>
  {ifElse(
    path => lengthLte(3, path),
    () => <LogoWrapper
      {...{collapsedMenu}}
      {...{collapseTransition}}
    ><Logo /></LogoWrapper>,
    () => <Link 
      to={`/${lang.replace('-us', '')}`}      
      onClick={pageTransition}
    ><LogoWrapper
      {...{collapsedMenu}}
      {...{collapseTransition}}
    ><Logo /></LogoWrapper></Link>
  )(path)}
  </Fragment>
))