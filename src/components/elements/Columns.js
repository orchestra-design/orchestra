/* global tw */
import React, { Fragment } from 'react'
import { JustImage } from './JustImage'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'

import { Container } from './Containers'
import { ColumnThree, Row } from './Grids'
import { and, isNil, not, safeMap, unless, uuid } from '../../helpers'
import { Body, Heading3 } from './Typography'

const Back = styled('div')`
  ${tw([
    'absolute', 'hidden', 'md:block', 
    'pin-t', 'w-full'
  ])}; 
  height: 64vh;
`

const RowWrapper = styled('div')`
  ${Row};
  ${tw(['py-q72', 'relative'])};
  ${({ hasntImage }) => and(not(hasntImage), 
    tw(['md:pt-q200']))};
`

const Col = styled('div')`
  ${ColumnThree};
  ${tw([
    'flex', 'flex-col', 'items-center', 
    'md:items-start'
  ])};
`

const Text = styled('div')`
  ${Body};
  ${tw([
    'max-w-xs', 'mb-q48', 'mt-q36', 'pl-1/6'
  ])};
  & h3 {
    ${Heading3};
    ${tw(['mb-q24', 'md:mb-q32'])};
  }
`

export const Columns = ({ primary, items }) => (
  <Fragment>
    {unless(isNil,() => 
      <Back>
        <JustImage image={primary.colbackimage} />
      </Back>
    )(primary.colbackimage)}
    <Container>
      <RowWrapper hasntImage={isNil(primary.colbackimage)} >
      {safeMap(item => (
        <Col key={uuid()}>
          <div key={uuid()}
            className={css`${tw('max-w-xs w-full')}`}
          >{unless(isNil,() =>
            <Img key={uuid()} 
              sizes={item.colimage.localFile.childImageSharp.sizes}
            />
          )(item.colimage)}</div>
          {unless(isNil,() =>
            <Text key={uuid()} 
              dangerouslySetInnerHTML={{ __html: item.coltext.html }}
            />
          )(item.coltext)}
        </Col>
      ))(items)}
      </RowWrapper>
    </Container>
  </Fragment>
)
