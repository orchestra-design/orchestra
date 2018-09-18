/* global tw */
import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { pageTransition } from '../../actions'
import { and, constant, isNil, not, uuid } from '../../helpers'

import { Button } from './Buttons'

const BlackButton = styled('span')`
  ${Button};
  ${tw([
    'h-q36',
    'mb-q36',
    'md:mb-0',
    'mr-0',
    'px-q12',
    'screen:h-q36',
    'screen:text-sm',
    'border-white',
    'border',
    'border-solid',
    'md:border-none',
  ])};
`

const LinkStyle = css`
  ${tw('no-underline p-q12')};
  &:nth-child(4) {
    ${tw(['md:hidden', 'lg:block'])};
  }
`

export const NavLink = connect(
  constant,
  { pageTransition }
)(({ linktitle, link, pageTransition }) => (
  <Fragment>
    {and(not(isNil(linktitle)), not(isNil(link))) && (
      <Link
        key={uuid()}
        to={link.url}
        onClick={pageTransition}
        className={LinkStyle}
      >
        <BlackButton key={uuid()}>{linktitle}</BlackButton>
      </Link>
    )}
  </Fragment>
))
