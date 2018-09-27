/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'

import { 
  ColumnThree, Container,
  Heading3, RichText, Row 
} from '../elements'

import { 
  isNil, safeMap, 
  unless, uuid
} from '../../helpers'

const RowWrapper = styled('div')`
  ${Row};
  ${tw([
    'items-center', 'md:items-start', 'pt-q72',
    'screen:pt-q200', 'screen:pb-q72', 'relative'
  ])};
`

const Col = styled('div')`
  ${ColumnThree};
  ${tw([
    'flex', 'flex-col', 'max-w-xs', 'mb-q48'
  ])};
`

const Header = styled('div')`
  ${Heading3};
  ${tw([
    'mb-q24', 'mt-q36', 'pl-1/6'
  ])};
`

const Text = styled('div')`
  ${RichText};
  ${tw(['pl-1/6'])};
  & li {
    ${tw(['font-semibold'])};
  }
  & li::after {
    background: ${({ theme }) => theme.color};
  }
  color: ${({ theme }) => theme.color};
`

export const Points = ({ points }) => (
  <Fragment>
    <Container>
      <RowWrapper>
      {safeMap(point => (
        <Col key={uuid()}>
          <div key={uuid()}
            className={css`${tw('max-w-xs w-full')}`}
          >{unless(isNil,() =>
            <Img key={uuid()} 
              fluid={point.pointsimage.localFile.childImageSharp.fluid}
            />
          )(point.pointsimage && point.pointsimage.localFile)}</div>
          {unless(isNil,() =>
            <Header key={uuid()} 
            >{point.pointsheading.text}</Header>
          )(point.pointsheading)}
          {unless(isNil,() =>
            <Text key={uuid()} 
              dangerouslySetInnerHTML={{ __html: point.pointstext.html }}
            />
          )(point.pointstext)}
        </Col>
      ))(points)}
      </RowWrapper>
    </Container>
  </Fragment>
)
