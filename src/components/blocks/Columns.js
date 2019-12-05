/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'

import { Container, Img, JustImage, RichText, Row } from '../elements'

import {
  isNil,
  length,
  safeMap,
  unless,
  uuid,
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
  ${tw(['flex-wrap', 'items-end', 'md:pt-q72', 'relative'])};
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
  ${tw(['max-w-xs'])};
  ${({ withoutPadding }) => !withoutPadding && tw(['pl-q24'])}
  color: ${({ theme }) => theme.color};
`

const Text = styled('div')`
  ${RichText};
  ${tw(['max-w-xs'])};
  ${({ withoutPadding }) => !withoutPadding && tw(['pl-q24'])}
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
          <Col
            key={uuid()}
            cols={cols}
            className={css`
              align-self: ${((item.coltext && item.coltext.html && item.coltext.html.includes('></')) || (item.colimage && !item.colimage.localFile)) && 'flex-start'};
            `}
          >
            {item.colimage && item.colimage.localFile && (
              <div
                className={css`
                  ${tw('max-w-xs w-full')};
                `}
              >
                <Img key={uuid()} src={item.colimage} />
              </div>
            )}
            {(item.colheading && item.colheading.html && !item.colheading.html.includes('></')) && (
              <div
                key={uuid()}
                className={css`
                  ${tw('max-w-xs w-full')};
                  ${item.colimage && item.colimage.localFile && tw('mt-q24')};
                `}
              >
                <Heading
                  key={uuid()}
                  dangerouslySetInnerHTML={{ __html: item.colheading.html }}
                  withoutPadding={withoutPadding || (item.colimage && !item.colimage.localFile)}
                />
              </div>
            )}
            {(item.coltext && item.coltext.html && !item.coltext.html.includes('></')) && (
              <div
                key={uuid()}
                className={css`
                  ${tw('max-w-xs w-full')};
                `}
              >
                <Text
                  key={uuid()}
                  dangerouslySetInnerHTML={{ __html: item.coltext.html }}
                  withoutPadding={withoutPadding || (item.colimage && !item.colimage.localFile)}
                />
              </div>
            )}
          </Col>
        ))(items)}
      </ImageWrapper>
    </Container>
  </Fragment>
)
