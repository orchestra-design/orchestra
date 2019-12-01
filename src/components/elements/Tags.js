/* global tw */
import React from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux'
import styled, { css } from 'react-emotion'

import { pageTransition } from '../../actions'

import { safeMap, uuid, constant } from '../../helpers'

import { ButtonSmallText } from './Typography'
import { BaseTransition } from './Transitions'

const TagsRow = styled('div')`
  ${tw([
    'flex',
    'flex-wrap',
    'md:flex-col',
    'items-baseline',
    'md:items-start',
    'w-auto',
  ])};
`

const LinkStyles = css`
  ${ButtonSmallText};
  ${tw([
    'inline-block',
    'mb-q8',
    'mr-q8',
    'no-underline',
    'px-q8',
    'py-q4',
    'text-black',
    'screen:text-white',
    'hover:bg-black',
    'hover:text-white',
    'shadow-none',
    'hover:shadow-elevate1',
    'whitespace-no-wrap',
  ])};
  box-shadow: 0 0 1px 0.72px white;
  ${BaseTransition};
`

export const Tags = connect(
  constant,
  { pageTransition }
)(({ lang, pageTransition, tags }) => {
  return (
    tags.length > 0 && (
      <TagsRow>
        {safeMap(tag => (
          <Link
            key={uuid()}
            className={LinkStyles}
            onClick={pageTransition}
            to={`/${lang}/projects?filter=${tag}`}
          >
            {tag}
          </Link>
        ))(tags)}
      </TagsRow>
    )
  )
})
