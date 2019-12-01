/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import {
  BaseTransition,
  Body,
  Container,
  Heading2,
  InfoTags,
  Tags,
  Row,
  ColumnThreeFive,
  ColumnTwoFive,
  Map,
} from '../elements'


const ColoredContainer = styled(Container)`
  ${tw(['py-q36', 'md:py-q72'])};
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
  ${tw(['max-w-sm', 'md:mb-q40'])};
  color: ${({ theme }) => theme.logoFill};
`

const Description = styled('div')`
  ${Body};
  ${tw(['max-w-sm', 'mb-q24', 'md:mb-q40'])};
`

export const WorkSecondScreen = connect(({ storedTheme }) => ({ storedTheme }))(
  ({ data, lang, storedTheme, tags }) => {
    const { descriptiontext, title, map } = data

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
            <Map map={map} />
            <InfoTags {...{ data }} {...{ lang }} />
          </Right>
        </ColoredRow>
      </ColoredContainer>
    )
  }
)
