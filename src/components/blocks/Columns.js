/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'

import { 
  ColumnThree, Container, 
  JustImage, RichText, Row 
} from '../elements'

import { 
  and, equals , isNil, length, not, safeMap, 
  unless, uuid
} from '../../helpers'

const Back = styled('div')`
  ${tw([
    'absolute', 'hidden', 'md:block', 
    'pin-t', 'w-full'
  ])}; 
  height: 64vh;
`

const RowWrapper = styled('div')`
  ${Row};
  ${tw([
    'flex-wrap', 'items-baseline',
    'py-q72', 'relative'
  ])};
  ${({ hasntImage }) => and(not(hasntImage), 
    tw(['md:pt-q200']))};
  ${({ length }) => and(equals(length, 2), 
    tw(['justify-center']))};
`

const Col = styled('div')`
  ${ColumnThree};
  ${tw([
    'flex', 'flex-col', 'items-center', 
    'md:items-start'
  ])};
`

const Text = styled('div')`
  ${RichText};
  ${tw([
    'max-w-xs', 'mb-q48', 'mt-q36', 
    'pl-1/6', 'w-full'
  ])};
  color: ${({ theme }) => theme.color};
`

export const Columns = ({ primary, items }) => (
  <Fragment>
    {unless(isNil,() => 
      <Back>
        <JustImage image={primary.colbackimage} />
      </Back>
    )(primary.colbackimage)}
    <Container>
      <RowWrapper hasntImage={isNil(primary.colbackimage)} length={length(items)} >
      {safeMap(item => (
        <Col key={uuid()}>
          <div key={uuid()}
            className={css`${tw('max-w-xs w-full')}`}
          >{unless(isNil,() =>
            <Img key={uuid()} 
              sizes={item.colimage.localFile.childImageSharp.sizes}
            />
          )(item.colimage && item.colimage.localFile)}</div>
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
