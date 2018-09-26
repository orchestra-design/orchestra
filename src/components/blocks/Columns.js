/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'
import { connect } from 'react-redux'

import { ColumnThree, Container, JustImage, RichText, Row } from '../elements'

import {
  and,
  equals,
  isNil,
  length,
  not,
  safeMap,
  unless,
  uuid,
  pick,
  splitEvery,
} from '../../helpers'

const Back = styled('div')`
  ${tw(['absolute', 'hidden', 'md:block', 'pin-t', 'w-full'])};
  height: 64vh;
`

const ImageWrapper = styled('div')`
  ${Row};
  ${tw(['flex-wrap', 'items-end', 'pt-q72', 'relative'])};
  ${({ hasntImage }) => and(not(hasntImage), tw(['md:pt-q200']))};
  ${({ length }) => and(equals(length, 2), tw(['justify-center']))};
`

const HeadingWrapper = styled('div')`
  ${Row};
  ${tw(['flex-wrap', 'items-end', 'mt-q36', 'relative'])};
  ${({ length }) => and(equals(length, 2), tw(['justify-center']))};
`

const TextWrapper = styled('div')`
  ${Row};
  ${tw(['flex-wrap', 'items-start', 'relative'])};
  ${({ length }) => and(equals(length, 2), tw(['justify-center']))};
`

const Col = styled('div')`
  ${ColumnThree};
  ${tw(['flex', 'flex-col', 'items-center', 'md:items-start'])};
`

const Heading = styled('div')`
  ${RichText};
  ${tw(['max-w-xs', 'w-full'])};
  color: ${({ theme }) => theme.color};
`

const Text = styled('div')`
  ${RichText};
  ${tw(['max-w-xs', 'mb-q48', 'w-full'])};
  color: ${({ theme }) => theme.color};
`

export const Columns = connect(pick(['isMobile']))(
  ({ isMobile, primary, items }) => (
    <Fragment>
      {unless(isNil, () => (
        <Back>
          <JustImage image={primary.colbackimage} />
        </Back>
      ))(primary.colbackimage)}
      <Container>
        {isMobile ? (
          <ImageWrapper
            hasntImage={isNil(primary.colbackimage)}
            length={length(items)}
          >
            {safeMap(item => (
              <Col key={uuid()}>
                <div
                  key={uuid()}
                  className={css`
                    ${tw('max-w-xs w-full')};
                  `}
                >
                  {unless(isNil, () => (
                    <Img
                      key={uuid()}
                      sizes={item.colimage.localFile.childImageSharp.sizes}
                    />
                  ))(item.colimage && item.colimage.localFile)}
                </div>
                <div
                  key={uuid()}
                  className={css`
                    ${tw('max-w-xs mt-q24 w-full')};
                  `}
                >
                  {unless(isNil, () => (
                    <Heading
                      key={uuid()}
                      dangerouslySetInnerHTML={{ __html: item.colheading.html }}
                    />
                  ))(item.colheading)}
                </div>
                <div
                  key={uuid()}
                  className={css`
                    ${tw('max-w-xs w-full')};
                  `}
                >
                  {unless(isNil, () => (
                    <Text
                      key={uuid()}
                      dangerouslySetInnerHTML={{ __html: item.coltext.html }}
                    />
                  ))(item.coltext)}
                </div>
              </Col>
            ))(items)}
          </ImageWrapper>
        ) : (
          <Fragment>
            {splitEvery(3, items).map(items => (
              <Fragment key={uuid()}>
                <ImageWrapper
                  hasntImage={isNil(primary.colbackimage)}
                  key={uuid()}
                  length={length(items)}
                >
                  {safeMap(item => (
                    <Col key={uuid()}>
                      <div
                        key={uuid()}
                        className={css`
                          ${tw('max-w-xs w-full')};
                        `}
                      >
                        {unless(isNil, () => (
                          <Img
                            key={uuid()}
                            sizes={
                              item.colimage.localFile.childImageSharp.sizes
                            }
                          />
                        ))(item.colimage && item.colimage.localFile)}
                      </div>
                    </Col>
                  ))(items)}
                </ImageWrapper>
                <HeadingWrapper key={uuid()} length={length(items)}>
                  {safeMap(item => (
                    <Col key={uuid()}>
                      <div
                        key={uuid()}
                        className={css`
                          ${tw('max-w-xs w-full')};
                        `}
                      >
                        {unless(isNil, () => (
                          <Heading
                            key={uuid()}
                            dangerouslySetInnerHTML={{
                              __html: item.colheading.html,
                            }}
                          />
                        ))(item.colheading)}
                      </div>
                    </Col>
                  ))(items)}
                </HeadingWrapper>
                <TextWrapper key={uuid()} length={length(items)}>
                  {safeMap(item => (
                    <Col key={uuid()}>
                      <div
                        key={uuid()}
                        className={css`
                          ${tw('max-w-xs w-full')};
                        `}
                      >
                        {unless(isNil, () => (
                          <Text
                            key={uuid()}
                            dangerouslySetInnerHTML={{
                              __html: item.coltext.html,
                            }}
                          />
                        ))(item.coltext)}
                      </div>
                    </Col>
                  ))(items)}
                </TextWrapper>
              </Fragment>
            ))}
          </Fragment>
        )}
      </Container>
    </Fragment>
  )
)
