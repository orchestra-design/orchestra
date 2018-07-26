/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { 
  BaseTransition, Breadcrumbs, BodySemibold, 
  Container, Heading1, Image, Tags
} from '../elements'

import {
  equals, isNil, unless
} from '../../helpers'

const FullScreenSection = styled('div')`
  ${tw([
    'flex', 'flex-col', 'justify-end', 'md:mb-q144',
    'screen:h-screen', 'relative', 'w-screen'
  ])};
  @media(max-width: 599px) {
    height: 100vw;
  }
  color: ${({ theme }) => theme.color};
`

const ColoredContainer = styled(Container)`
  ${tw(['screen:opacity-0'])};
  ${({ storedTheme }) => equals(storedTheme, 'colored') && tw(['screen:opacity-100'])};
  ${BaseTransition};
`

const Heading =  styled('h1')`
  ${Heading1};
  ${tw(['max-w-sm', 'mb-q24', 'md:mb-q40'])};
  color: ${({ theme }) => theme.logoFill};
  text-shadow: ${({ theme }) => theme.logoShadow && '0 0 1.5rem rgba(0,0,0,0.24)'};
`

const Description = styled('div')`
  ${BodySemibold};
  ${tw([
    'ml-auto', 'mt-q24', 'screen:mt-q36',
    'w-3/4', 'screen:w-2/5'
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
      <div {...{theme}} >
        <FullScreenSection>
          {unless(isNil, () =>
              <div
                className={css`${tw('block screen:hidden')}`}
              ><Image {...{image}} /></div>
            )(image)}
          <Container className={css`${tw('mb-q36 screen:mb-q144 relative',)}`} >
            <Heading>{  statement.text }</Heading>
            <Breadcrumbs 
              className={css`${tw('text-black text-body whitespace-normal')}`} 
            >{ title }</Breadcrumbs>
          </Container>
        </FullScreenSection>
      </div>
      <div theme="colored" className={css`${tw('screen:h-screen')}`} >
        <ColoredContainer
          className={css`${tw('relative')}`}
          {...{storedTheme}}
        >
          <Heading>{  statement.text }</Heading>
          <Breadcrumbs 
            className={css`${tw('text-black text-body whitespace-normal')}`} 
          >{ title }</Breadcrumbs>
          <Tags {...{data}} {...{lang}} {...{tags}} />
          <Description
            dangerouslySetInnerHTML={{ __html: descriptiontext.html }}
          />
        </ColoredContainer>
      </div>
    </Fragment>
  )
})