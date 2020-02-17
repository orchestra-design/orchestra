/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'

import { Container, Img, JustImage, RichText, Row } from '../elements'

import { isNil, length, safeMap, unless, uuid } from '../../helpers'

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
  ${tw(['flex-wrap', 'items-start', 'md:pt-q72', 'relative'])};
  ${({ length }) => length !== 0 && tw(['justify-center'])};
  ${({ hasntImage }) => !hasntImage && tw(['sm:pt-q200'])};
`

const Col = styled('div')`
  ${tw([
    'md:px-q12',
    'w-full',
    'flex',
    'flex-col',
    'items-center',
    'md:items-start',
  ])};
  &:not(:last-child) {
    @media (max-width: 767px) {
      ${tw(['mb-q24'])};
    }
  }
  min-width: calc((${({ cols }) => 1 / cols} * 100%) - 1.5rem);
  @media (min-width: 768px) {
    width: calc((${({ cols }) => 1 / cols} * 100%) - 1.5rem);
    max-width: calc((${({ cols }) => 1 / cols} * 100%) - 1.5rem);
  }
`

const Heading = styled('div')`
  ${RichText};
  ${({ withoutPadding }) => !withoutPadding && tw(['pl-q24'])}
  color: ${({ theme }) => theme.color};
`

const Text = styled('div')`
  ${RichText};
  ${({ withoutPadding }) => !withoutPadding && tw(['pl-q24'])}
  ${({ withoutHeading }) => withoutHeading && tw(['mt-q24'])}
  color: ${({ theme }) => theme.color};
`

export const Columns = ({ primary, items, withoutPadding, cols = 3 }) => (
  <Fragment>
    {unless(isNil, () => (
      <Back>
        <JustImage image={primary.colbackimage} />
      </Back>
    ))(primary.colbackimage)}
    <Container>
      <ImageWrapper
        hasntImage={isNil(primary.colbackimage)}
        length={length(items) % cols}
      >
        {safeMap(item => (
          <Col key={uuid()} cols={cols}>
            {item.colimage && item.colimage.localFile && (
              <div
                className={css`
                  ${tw('relative w-full')};
                  padding-bottom: 100%;
                `}
              >
                <Img
                  key={uuid()}
                  className={css`
                    ${tw('pin')}
                  `}
                  src={item.colimage}
                  style={{ position: 'absolute' }}
                />
              </div>
            )}
            {item.colheading &&
              item.colheading.html &&
              !item.colheading.html.includes('></') && (
                <div
                  key={uuid()}
                  className={css`
                    ${tw('w-full')};
                    ${item.colimage && item.colimage.localFile && tw('mt-q24')};
                  `}
                >
                  <Heading
                    key={uuid()}
                    dangerouslySetInnerHTML={{ __html: item.colheading.html }}
                    withoutPadding={
                      withoutPadding ||
                      (item.colimage && !item.colimage.localFile)
                    }
                  />
                </div>
              )}
            {item.coltext &&
              item.coltext.html && (
                <div
                  key={uuid()}
                  className={css`
                    ${tw('w-full')};
                  `}
                >
                  <Text
                    key={uuid()}
                    dangerouslySetInnerHTML={{ __html: item.coltext.html }}
                    withoutHeading={ !item.colheading }
                    withoutPadding={
                      withoutPadding ||
                      (item.colimage && !item.colimage.localFile)
                    }
                  />
                </div>
              )}
          </Col>
        ))(items)}
      </ImageWrapper>
    </Container>
  </Fragment>
)
