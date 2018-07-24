/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'

import { 
  Body, ColumnEight, ColumnThree, Container,
  Heading3, LeadText, Row
} from '../elements'

import { 
  constant, equals, ifElse, isNil, 
  safeMap, unless, uuid 
} from '../../helpers'

const RowWrapper = styled('div')`
  ${Row};
  ${tw([
    'items-baseline',
    'py-q72', 'relative'
  ])};
  color: ${({ theme }) => theme.color};
`


const LeftCol = styled('div')`
  ${tw(['md:text-right'])};
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
  & .lead {
    ${LeadText};
    ${tw(['m-0'])}
  }
`

export const ImageCaption = ({ primary, items }) => (
  <Container>
    <RowWrapper>
      <LeftCol grid={primary.sicgrid} >
      {unless(isNil,() =>
        <div key={uuid()} 
          dangerouslySetInnerHTML={{ __html: primary.sicheader.html }}
        />
      )(primary.sicheader)}
      {unless(isNil,() =>
        <div
          className={css`${tw('max-w-xs w-full')}`}
        ><Img 
          sizes={primary.sicimage.localFile.childImageSharp.sizes}
        /></div>
      )(primary.sicimage)}
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
