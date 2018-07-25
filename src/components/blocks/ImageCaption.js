/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'

import { 
  Body, ColumnEight, ColumnThree, Container,
  Heading2, Heading3, Heading4, LeadText, Row
} from '../elements'

import { 
  and, constant, equals, ifElse, isNil, 
  safeMap, unless, uuid 
} from '../../helpers'

const RowWrapper = styled('div')`
  ${Row};
  ${tw([
    'items-center',
    'py-q72', 'relative'
  ])};
  ${({ hasntImage }) => and(hasntImage, tw(['items-baseline']))};
  color: ${({ theme }) => theme.color};
`


const LeftCol = styled('div')`
  ${tw(['md:text-right'])};
  & h2 {
    ${Heading2};
  }
  & h3 {
    ${Heading3};
  }
  ${({ grid }) => ifElse(equals('left'), 
    constant(ColumnThree), 
    constant(ColumnEight)
  )(grid)};
`

const RightCol = styled('div')`
  ${tw([
    'flex', 'flex-col', 'items-center', 
    'md:items-start'
  ])};
  ${({ grid }) => ifElse(equals('left'), 
    constant(ColumnEight), 
    constant(ColumnThree)
  )(grid)};
`

const Text = styled('div')`
  ${Body};
  & h3 {
    ${Heading3};
    ${tw(['mb-q24', 'md:mb-q32'])};
  }
  & h4 {
    ${Heading4};
    ${tw(['mb-q16', 'md:mb-q24'])};
  }
  & .lead {
    ${LeadText};
    ${tw(['m-0'])}
  }
`

export const ImageCaption = ({ primary, items }) => (
  <Container>
    <RowWrapper hasntImage={isNil(primary.sicimage && primary.sicimage.localFile)}>
      <LeftCol grid={primary.sicgrid} >
      {unless(isNil,() =>
        <div 
          dangerouslySetInnerHTML={{ __html: primary.sicheader.html }}
        />
      )(primary.sicheader)}
      {unless(isNil, () =>
        <div
          className={css`${tw('max-w-xs w-full')}`}
        ><Img 
          sizes={primary.sicimage.localFile.childImageSharp.sizes}
        /></div>
      )(primary.sicimage && primary.sicimage.localFile)}
      </LeftCol>
      <RightCol grid={primary.sicgrid} >
      {safeMap(item => (
        <Fragment key={uuid()} >
        {unless(isNil,() =>
          <div key={uuid()}
            className={css`${tw('max-w-xs w-full')}`}
          ><Img key={uuid()} 
            sizes={item.sictextimage.localFile.childImageSharp.sizes}
          /></div>
        )(item.sictextimage)}
        {unless(isNil,() =>
          <Text key={uuid()} 
            dangerouslySetInnerHTML={{ __html: item.sictext.html }}
          />
        )(item.sictext)}
        </Fragment>
      ))(items)}
      </RightCol>
    </RowWrapper>
  </Container>
)
