/* global tw */
import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import styled from 'react-emotion'
import { connect } from 'react-redux'

import { toggleMenu } from '../../actions'
import { and, isNil, not } from '../../helpers'
import { Button } from '../elements'
import { uuid } from '../../helpers'

const LinkButton = styled(Link)`
  ${Button};
  ${tw([
    'h-q36', 'screen:h-q48',
    'mb-q36', 'md:mb-0',
    'mr-0', 'md:mr-q36', 'px-q12',
    'border-white', 'border',
    'border-solid', 'md:border-none'
  ])};
`
export const NavLink = connect(
  ({ isMenu }) => ({ isMenu }),
  { toggleMenu }
)(({ linktitle, link, isMenu, toggleMenu }) => (
  <Fragment>
    {and(not(isNil(linktitle)), not(isNil(link))) && 
      <LinkButton 
        key={uuid()} 
        to={link.url}
        onClick={() => isMenu && toggleMenu()}
      >{ linktitle }</LinkButton>
    }
  </Fragment>
))
