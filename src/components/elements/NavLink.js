/* global tw */
import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { toggleMenu } from '../../actions'
import { and, isNil, not } from '../../helpers'
import { Button } from '../elements'
import { uuid } from '../../helpers'

const BlackButton = styled('span')`
  ${Button};
  ${tw([
    'h-q36', 'mb-q36', 'md:mb-0',
    'mr-0', 'md:mr-q36', 'px-q12',
    'border-white', 'border',
    'border-solid', 'md:border-none'
  ])};
  ${({ collapseTransition }) => !collapseTransition && 
    tw(['screen:h-q48', 'screen:text-lg'])
  };
  ${({ collapsedMenu, isMenu }) => collapsedMenu && !isMenu &&
    tw(['screen:h-q36', 'screen:text-sm'])
  };
`

export const NavLink = connect(
  ({ collapsedMenu, collapseTransition, isMenu }) => ({ collapsedMenu, collapseTransition, isMenu }),
  { toggleMenu }
)(({ linktitle, link, collapsedMenu, collapseTransition, isMenu, toggleMenu }) => (
  <Fragment>
    {and(not(isNil(linktitle)), not(isNil(link))) && 
      <Link
        key={uuid()} 
        to={link.url}
        onClick={() => isMenu && toggleMenu()}
        className={css`${tw('no-underline')};`}       
      >
        <BlackButton 
          key={uuid()} 
          {...{collapsedMenu}} 
          {...{collapseTransition}} 
          {...{isMenu}} 
        >
        { linktitle }
        </BlackButton>
      </Link>
    }
  </Fragment>
))
