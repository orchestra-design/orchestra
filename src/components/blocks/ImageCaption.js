/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'

import {
  ColumnEight,
  ColumnThree,
  Container,
  Headers,
  Img,
  RichText,
  Row,
  RichTextSmall,
} from '../elements'

import {
  and,
  constant,
  equals,
  ifElse,
  isNil,
  safeMap,
  unless,
  uuid,
  includes,
} from '../../helpers'

const RowWrapper = styled('div')`
  ${Row};
  ${tw(['items-center', 'py-q72', 'relative'])};
  ${({ hasntImage }) => and(hasntImage, tw(['items-baseline']))};
  ${({ hasRight }) => and(hasRight, tw(['pb-0']))};
  color: ${({ theme }) => theme.color};
`

const LeftCol = styled('div')`
  ${Headers};
  ${tw(['md:text-right'])};
  ${({ grid }) =>
    ifElse(equals('left'), constant(ColumnThree), constant(ColumnEight))(grid)};
`

const RightCol = styled('div')`
  ${tw(['flex', 'flex-col', 'items-center', 'md:items-start'])};
  ${({ grid }) =>
    ifElse(equals('left'), constant(ColumnEight), constant(ColumnThree))(grid)};
  ${({ hasRight }) => and(hasRight, tw(['mb-0']))};  
`

const Text = styled('div')`
  ${RichText};
`

export const ImageCaption = ({ primary, items }) => {
  const hasRight = items.every(
    item =>
      (item.sictext && !includes('><', item.sictext.html)) ||
      (item.sictextimage && item.sictextimage.localFile)
  )

  return (
    <Container>
      <RowWrapper
        hasntImage={isNil(primary.sicimage && primary.sicimage.localFile)}
        {...{ hasRight }}
      >
        <LeftCol grid={primary.sicgrid}>
          {unless(isNil, () => (
            <div
              className={RichTextSmall}
              dangerouslySetInnerHTML={{ __html: primary.sicheader.html }}
            />
          ))(primary.sicheader)}
          {unless(isNil, () => (
            <div
              className={css`
                ${tw('max-w-xs w-full')};
              `}
            >
              <Img src={primary.sicimage} />
            </div>
          ))(primary.sicimage && primary.sicimage.localFile)}
        </LeftCol>
        <RightCol grid={primary.sicgrid} {...{ hasRight }}>
          {safeMap(item => (
            <Fragment key={uuid()}>
              {unless(isNil, () => (
                <div
                  key={uuid()}
                  className={css`
                    ${tw('max-w-xs w-full')};
                  `}
                >
                  <Img key={uuid()} src={item.sictextimage} />
                </div>
              ))(item.sictextimage)}
              {unless(isNil, () => (
                <Text
                  key={uuid()}
                  dangerouslySetInnerHTML={{ __html: item.sictext.html }}
                />
              ))(item.sictext)}
            </Fragment>
          ))(items)}
        </RightCol>
      </RowWrapper>
    </Container>
  )
}
