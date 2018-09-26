/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'

import { BodySemibold, Container, Heading2, Image } from '../elements'

import { isNil, length, lt, pathOr, unless } from '../../helpers'

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

const Heading = styled('h1')`
  ${Heading2};
  ${({ statementLenght }) => statementLenght && tw(['max-w-md'])};
  text-shadow: ${({ theme }) =>
    theme.logoShadow && '0 0 1.5rem rgba(0,0,0,0.24)'};
`

const Description = styled('div')`
  ${BodySemibold};
  ${tw(['ml-auto', 'mt-q24', 'screen:mt-q36', 'w-3/4', 'screen:w-2/5'])};
`

export const ImageStatement = ({ data }) => {
  const { image, statement } = data
  const statementLenght = lt(length(statement.text), 40)

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
      <Container
        className={css`
          ${tw('relative mb-q72 screen:mb-q144')};
        `}
      >
        <Heading {...{ statementLenght }}>{statement.text}</Heading>
        {unless(isNil, description => <Description>{description}</Description>)(
          pathOr(null, ['description'], data)
        )}
      </Container>
    </FullScreenSection>
  )
}
