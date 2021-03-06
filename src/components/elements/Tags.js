/* global tw */
import React from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux'
import styled from 'react-emotion'

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
    'mb-q24',
    'w-auto',
  ])};
`

const StyledLink = styled(Link)`
  ${ButtonSmallText};
  ${tw([
    'inline-block',
    'mb-q8',
    'mr-q8',
    'no-underline',
    'px-q8',
    'py-q4',
    'hover:bg-black',
    'hover:text-white',
    'shadow-none',
    'hover:shadow-elevate1',
    'whitespace-no-wrap',
  ])};
  color: ${({ theme }) => theme.logoFill};
  box-shadow: ${({ theme }) => `0 0 1px 0.72px ${theme.logoFill}`};
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
          <StyledLink
            key={uuid()}
            onClick={pageTransition}
            to={`/${lang}/projects?filter=${tag}`}
          >
            {tag}
          </StyledLink>
        ))(tags)}
      </TagsRow>
    )
  )
})
