/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { 
  BaseTransition, Breadcrumbs, BodySemibold, 
  Container, Heading1, Image, Tags,
  Row, ColumnThreeFive, ColumnTwoFive
} from '../elements'

import {
  equals, isNil, unless, not
} from '../../helpers'

const FullScreenSection = styled('div')`
  ${tw([
    'flex', 'flex-col', 'justify-end',
    'md:mb-q144', 'screen:h-screen', 'relative', 
    'w-screen'
  ])};
  @media(max-width: 599px) {
    height: 100vw;
  }
  color: ${({ theme }) => theme.color};
`

const StatementContainer = styled(Container)`
  ${tw(['screen:opacity-0'])};
  ${({ storedTheme }) => not(equals(storedTheme, 'colored')) && tw(['screen:opacity-100'])};
  ${BaseTransition};
`

const ColoredContainer = styled(Container)`
  ${tw(['screen:opacity-0', 'md:pb-q200'])};
  ${({ storedTheme }) => equals(storedTheme, 'colored') && tw(['screen:opacity-100'])};
  ${BaseTransition};
`

const ColoredRow = styled('div')`
  ${Row};
  ${tw(['items-baseline'])};
`

const Left = styled('div')`
  ${ColumnThreeFive};
`

const Right = styled('div')`
  ${ColumnTwoFive};
`

const Heading =  styled('h1')`
  ${Heading1};
  ${tw([
    'max-w-sm', 'mb-q24', 'md:mb-q40'
  ])};
  color: ${({ theme }) => theme.logoFill};
  text-shadow: ${({ theme }) => theme.logoShadow && '0 0 1.5rem rgba(0,0,0,0.24)'};
`

const Description = styled('div')`
  ${BodySemibold};
  ${tw([
    
  ])};
`

export const WorkStatement = connect(
    ({ storedTheme }) => ({ storedTheme })
  )(({ data, lang, storedTheme, tags }) => {
  const { 
    descriptiontext, image, statement,
    theme, title,
  } = data
  
  return (
    <Fragment>
      <div        
        image={JSON.stringify(image)}
        {...{theme}} 
      >
        <FullScreenSection>
          {unless(isNil, () =>
              <div
                className={css`${tw('block screen:hidden')}`}
              ><Image {...{image}} /></div>
            )(image)}
          <StatementContainer 
            className={css`${tw('mb-q36 screen:mb-q144 relative',)}`}
            {...{storedTheme}}
          >
            <Heading>{  statement.text }</Heading>
            <Breadcrumbs 
              className={css`${tw('text-black text-body whitespace-normal')}`} 
            >{ title }</Breadcrumbs>
          </StatementContainer>
        </FullScreenSection>
      </div>
      <div theme="colored">
        <ColoredContainer
          className={css`${tw('relative')}`}
          {...{storedTheme}}
        >
          <ColoredRow>
            <Left>
              <Heading
                className={css`${tw('hidden screen:block')}`}
              >{  statement.text }</Heading>
              <Breadcrumbs 
                className={css`${tw('hidden screen:block text-black text-body whitespace-normal')}`} 
              >{ title }</Breadcrumbs>
              <Tags {...{data}} {...{lang}} {...{tags}} />
            </Left>
            <Right>
              <Description
                dangerouslySetInnerHTML={{ __html: descriptiontext.html }}
              />
            </Right>
          </ColoredRow>
        </ColoredContainer>
      </div>
    </Fragment>
  )
})