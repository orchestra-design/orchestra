/* global tw */
import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux'
import styled from 'react-emotion'

import { toggleMenu } from '../../actions'
import { ifElse, lengthLte } from '../../helpers'
import { Logo } from './Logo'

const LogoWrapper = styled('div')`
  ${tw(['screen:ml-1/12'])};
  height: 69px;
  width: 186px;
  width: ${({ collapsedMenu, collapseTransition }) => !collapsedMenu && !collapseTransition && 'calc(186px + 135 * ((100vw - 320px) / 1280))'};
  height: ${({ collapsedMenu, collapseTransition }) => !collapsedMenu && !collapseTransition && 'calc(69px + 43 * ((100vw - 320px) / 1280))'};
  min-height: 69px;
  min-width: 186px;
`

export const HeaderLogo = connect(
  ({ 
    collapsedMenu, collapseTransition, isMenu 
  }) => ({ 
    collapsedMenu, collapseTransition, isMenu 
  }),
  { toggleMenu }
)(({ 
  lang, path, collapsedMenu, collapseTransition, 
  isMenu, toggleMenu 
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
      onClick={() => isMenu && toggleMenu()}
    ><LogoWrapper
      {...{collapsedMenu}}
      {...{collapseTransition}}
    ><Logo /></LogoWrapper></Link>
  )(path)}
  </Fragment>
))