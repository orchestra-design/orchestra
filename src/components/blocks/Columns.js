/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { Container, Img, JustImage, RichText, Row } from '../elements'

import {
  and,
  equals,
  isNil,
  length,
  safeMap,
  unless,
  uuid,
  pick,
  splitEvery,
} from '../../helpers'

const Back = styled('div')`
  ${tw([
    'absolute',
    'hidden',
    'md:block',
    'pin-t',
    'py-q112',
    'md:py-q200',
    'xl:py-q224',
    'w-full',
  ])};
`

const ImageWrapper = styled('div')`
  ${Row};
  ${tw(['flex-wrap', 'items-end', 'pt-q72', 'relative'])};
  ${({ length }) => and(equals(length, 2), tw(['justify-center']))};
  ${({ hasntImage }) => !hasntImage && tw(['sm:pt-q200'])};
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
  ${tw([
    'md:px-q12',
    'mb-q24',
    'md:mb-0',
    'w-full',
    'flex',
    'flex-col',
    'items-center',
    'md:items-start',
  ])};
  min-width: calc((${({ cols }) => 1 / cols} * 100%) - 1.5rem);
  @media (min-width: 768px) {
    width: calc((${({ cols }) => 1 / cols} * 100%) - 1.5rem);
    max-width: calc((${({ cols }) => 1 / cols} * 100%) - 1.5rem);
  }
`

const Heading = styled('div')`
  ${RichText};
  ${tw(['max-w-xs'])};
  ${({ withoutPadding }) => !withoutPadding && tw(['pl-q24'])}
  color: ${({ theme }) => theme.color};
`

const Text = styled('div')`
  ${RichText};
  ${tw(['max-w-xs', 'mb-q48'])};
  ${({ withoutPadding }) => !withoutPadding && tw(['pl-q24'])}
  color: ${({ theme }) => theme.color};
`

export const Columns = connect(pick(['isMobile']))(
  ({ isMobile, primary, items, withoutPadding, cols = 3 }) => (
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
              <Col key={uuid()} cols={cols}>
                <div
                  key={uuid()}
                  className={css`
                    ${tw('max-w-xs w-full')};
                  `}
                >
                  {unless(isNil, () => (
                    <Img key={uuid()} src={item.colimage} />
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
                      {...{ withoutPadding }}
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
                      {...{ withoutPadding }}
                    />
                  ))(item.coltext)}
                </div>
              </Col>
            ))(items)}
          </ImageWrapper>
        ) : (
          <Fragment>
            {splitEvery(cols, items).map(items => (
              <Fragment key={uuid()}>
                <ImageWrapper
                  hasntImage={isNil(primary.colbackimage)}
                  key={uuid()}
                  length={length(items)}
                >
                  {safeMap(item => (
                    <Col key={uuid()} cols={cols}>
                      <div
                        key={uuid()}
                        className={css`
                          ${tw('max-w-xs w-full')};
                        `}
                      >
                        {unless(isNil, () => (
                          <Img key={uuid()} src={item.colimage} />
                        ))(item.colimage && item.colimage.localFile)}
                      </div>
                    </Col>
                  ))(items)}
                </ImageWrapper>
                <HeadingWrapper key={uuid()} length={length(items)}>
                  {safeMap(item => (
                    <Col key={uuid()} cols={cols}>
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
                            {...{ withoutPadding }}
                          />
                        ))(item.colheading)}
                      </div>
                    </Col>
                  ))(items)}
                </HeadingWrapper>
                <TextWrapper key={uuid()} length={length(items)}>
                  {safeMap(item => (
                    <Col key={uuid()} cols={cols}>
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
                            {...{ withoutPadding }}
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
