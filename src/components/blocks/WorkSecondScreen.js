/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import {
  BaseTransition,
  BodySemibold,
  Container,
  Heading2,
  InfoTags,
  Tags,
  Row,
  ColumnThreeFive,
  ColumnTwoFive,
} from '../elements'

import { equals } from '../../helpers'

const ColoredContainer = styled(Container)`
  ${tw(['screen:opacity-0', 'py-q36', 'md:py-q72'])};
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

const Heading = styled('h2')`
  ${Heading2};
  ${tw(['max-w-sm'])};
  color: ${({ theme }) => theme.logoFill};
`

const Description = styled('div')`
  ${BodySemibold};
  ${tw(['max-w-sm', 'mb-q24', 'md:mb-q40'])};
`

export const WorkSecondScreen = connect(({ storedTheme }) => ({ storedTheme }))(
  ({ data, lang, storedTheme, tags }) => {
    const { descriptiontext, title } = data

    return (
      <ColoredContainer
        className={css`
          ${tw('relative')};
        `}
        {...{ storedTheme }}
      >
        <ColoredRow>
          <Left>
            <Heading>
              {title}
            </Heading>
            </Left>
            <Right>
              <Description
                dangerouslySetInnerHTML={{ __html: descriptiontext.html }}
              />
            </Right>
          </ColoredRow>
          <ColoredRow>
          <Left>
            <Tags {...{ lang }} {...{ tags }} />
          </Left>
          <Right>
            <InfoTags {...{ data }} {...{ lang }} />
          </Right>
        </ColoredRow>
      </ColoredContainer>
    )
  }
)
