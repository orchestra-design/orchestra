/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'

import { 
  Breadcrumbs, BodySemibold, Container, Heading1, Image 
} from '../elements'

import {
  isNil, pathOr, unless
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

const Heading =  styled('h1')`
  ${Heading1};
  ${tw(['max-w-sm', 'mb-q24', 'md:mb-q48'])};
  text-shadow: ${({ theme }) => theme.logoShadow && '0 0 1.5rem rgba(0,0,0,0.24)'};
`

const Description = styled('div')`
  ${BodySemibold};
  ${tw([
    'ml-auto', 'mt-q24', 'screen:mt-q36',
    'w-3/4', 'screen:w-2/5'
  ])};
`

export const WorkStatement = ({ data }) => {
  const { 
    image, title, statement
  } = data
  
  return (
    <FullScreenSection>
      {unless(isNil, () =>
          <div
            className={css`${tw('block screen:hidden')};`}
          ><Image {...{image}} /></div>
        )(image)}
      <Container className={css`${tw('relative mb-q36 screen:mb-q144',)};`} >
        <Heading>{  statement.text }</Heading>
        <Breadcrumbs 
          className={css`${tw('text-black text-body whitespace-normal')}`} 
        >{ title }</Breadcrumbs>
        {unless(isNil, (description) =>
          <Description>{ description }</Description>
        )(pathOr(null, ['description'], data))}
      </Container>
    </FullScreenSection>
  )
}