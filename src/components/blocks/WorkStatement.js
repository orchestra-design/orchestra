/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import {
  BaseTransition,
  // Breadcrumbs,
  Container,
  Heading1,
  Image,
} from '../elements'

import { equals, isNil, unless, not } from '../../helpers'

const FullScreenSection = styled('div')`
  ${tw([
    'flex',
    'flex-col',
    'justify-end',
    'md:mb-q144',
    'screen:h-screen',
    'relative',
    'w-screen',
  ])};
  @media (max-width: 599px) {
    height: 100vw;
    min-height: 420px;
  }
  color: ${({ theme }) => theme.color};
`

const StatementContainer = styled(Container)`
  ${tw(['screen:opacity-0'])};
  ${({ storedTheme }) =>
    not(equals(storedTheme, 'colored')) && tw(['screen:opacity-100'])};
  ${BaseTransition};
`

const Heading = styled('h1')`
  ${Heading1};
  ${tw(['max-w-sm', 'mb-q24', 'md:mb-q40'])};
  color: ${({ theme }) => theme.logoFill};
  text-shadow: ${({ theme }) =>
    theme.logoShadow && '0 0 1.5rem rgba(0,0,0,0.24)'};
`

export const WorkStatement = connect(({ storedTheme }) => ({ storedTheme }))(
  ({ data, storedTheme }) => {
    const { image, statement } = data

    return (
      <FullScreenSection>
        {unless(isNil, () => (
          <div
            className={css`
              ${tw('block screen:hidden')};
            `}
          >
            <Image {...{ image }} />
          </div>
        ))(image)}
        <StatementContainer
          className={css`
            ${tw('mb-q36 screen:mb-q144 relative')};
          `}
          {...{ storedTheme }}
        >
          <Heading>{statement.text}</Heading>
          {/* <Breadcrumbs
            className={css`
              ${tw('text-black text-body whitespace-normal')};
            `}
          >
            {title}
          </Breadcrumbs> */}
        </StatementContainer>
      </FullScreenSection>
    )
  }
)
