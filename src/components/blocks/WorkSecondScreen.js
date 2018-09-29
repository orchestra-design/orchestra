/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import {
  BaseTransition,
  Breadcrumbs,
  BodySemibold,
  Container,
  Heading1,
  InfoTags,
  Tags,
  Row,
  ColumnThreeFive,
  ColumnTwoFive,
} from '../elements'

import { equals } from '../../helpers'

const ColoredContainer = styled(Container)`
  ${tw(['screen:opacity-0', 'py-q48', 'md:py-q112'])};
  ${({ storedTheme }) =>
    equals(storedTheme, 'colored') && tw(['screen:opacity-100'])};
  ${BaseTransition};
`

const ColoredRow = styled('div')`
  ${Row};
  ${tw(['items-start'])};
`

const Left = styled('div')`
  ${ColumnThreeFive};
`

const Right = styled('div')`
  ${ColumnTwoFive};
`

const Heading = styled('h1')`
  ${Heading1};
  ${tw(['max-w-sm', 'mb-q24', 'md:mb-q40'])};
  color: ${({ theme }) => theme.logoFill};
  text-shadow: ${({ theme }) =>
    theme.logoShadow && '0 0 1.5rem rgba(0,0,0,0.24)'};
`

const Description = styled('div')`
  ${BodySemibold};
`

export const WorkSecondScreen = connect(({ storedTheme }) => ({ storedTheme }))(
  ({ data, lang, storedTheme, tags }) => {
    const { descriptiontext, statement, title } = data

    return (
      <ColoredContainer
        className={css`
          ${tw('relative')};
        `}
        {...{ storedTheme }}
      >
        <ColoredRow>
          <Left>
            <Heading
              className={css`
                ${tw('hidden screen:block')};
              `}
            >
              {statement.text}
            </Heading>
            <Breadcrumbs
              className={css`
                ${tw(
                  'hidden screen:block text-black text-body whitespace-normal'
                )};
              `}
            >
              {title}
            </Breadcrumbs>
          </Left>
          <Right>
            <Description
              dangerouslySetInnerHTML={{ __html: descriptiontext.html }}
            />
            <InfoTags {...{ data }} {...{ lang }} />
          </Right>
        </ColoredRow>
        <ColoredRow>
          <Left>
            <Tags {...{ lang }} {...{ tags }} />
          </Left>
          <Right />
        </ColoredRow>
      </ColoredContainer>
    )
  }
)
