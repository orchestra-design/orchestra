/* global tw */
import React, { Fragment } from 'react'
import { JustImage } from './JustImage'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'

import { Container } from './Containers'
import { ColumnThree, Row } from './Grids'
import { uuid } from '../../helpers'
import { Body, Heading3 } from './Typography'

const RowWrapper = styled('div')`
  ${Row};
  ${tw(['md:pt-q200', 'relative'])};
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
    <div
      className={css`${tw('absolute hidden md:block pin-t w-full')}; height: 64vh;`}
    ><JustImage image={primary.colbackimage} /></div>
    <Container>
      <RowWrapper>
      {items.map(item => (
        <Col key={uuid()}>
          <div key={uuid()}
            className={css`${tw('max-w-xs w-full')}`}
          ><Img key={uuid()} 
              sizes={item.colimage.localFile.childImageSharp.sizes}
            /></div>
          <Text key={uuid()} 
            dangerouslySetInnerHTML={{ __html: item.coltext.html }}
          />
        </Col>
      ))}
      </RowWrapper>
    </Container>
  </Fragment>
)
