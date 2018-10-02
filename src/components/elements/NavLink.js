/* global tw */
import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { pageTransition } from '../../actions'
import { and, constant, isNil, not, uuid } from '../../helpers'

import { Button } from './Buttons'
import { ButtonText } from './Typography'

const BlackButton = styled('span')`
  ${Button};
  ${tw([
    'flex-no-shrink',
    'h-q36',
    'mb-q12',
    'md:mb-0',
    'mr-0',
    'px-q12',
    'screen:h-q36',
    'screen:text-sm',
    'border-white',
    'border',
    'border-solid',
    'md:border-none',
    'hover:text-black',
    'hover:bg-white',
  ])};
`

const NonButton = styled('span')`
  ${ButtonText};
  ${tw([
    'flex',
    'flex-no-shrink',
    'justify-center',
    'bg-white',
    'text-black',
    'items-center',
    'h-q36',
    'mb-q12',
    'md:mb-0',
    'mr-0',
    'px-q12',
    'screen:h-q36',
    'screen:text-sm',
  ])};
`

const LinkStyle = css`
  ${tw('no-underline p-q12')};
`

export const NavLink = connect(
  constant,
  { pageTransition }
)(({ active, linktitle, link, pageTransition }) => (
  <Fragment>
    {and(not(isNil(linktitle)), not(isNil(link))) && active ? (
      <span className={LinkStyle}>
        <NonButton key={uuid()}>{linktitle}</NonButton>
      </span>
    ) : (
      <Link
        key={uuid()}
        to={link.url}
        onClick={pageTransition}
        className={LinkStyle}
      >
        <BlackButton {...{ active }} key={uuid()}>
          {linktitle}
        </BlackButton>
      </Link>
    )}
  </Fragment>
))
