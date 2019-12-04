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
import { Slider } from './Slider'

const RowWrapper = styled('div')`
  ${Row};
  ${tw(['items-center', 'md:items-start', 'py-q48', 'md:py-q72', 'relative'])};
  ${({ hasntImage }) => and(hasntImage, tw(['items-baseline']))};
  color: ${({ theme }) => theme.color};
`

const LeftCol = styled('div')`
  ${tw(['md:text-right'])};
  ${({ grid }) =>
    ifElse(
      equals('left'),
      constant(ColumnThree),
      constant(ColumnEight)
    )(grid)};
  @media (max-width: 768px) {
    order: ${({ hasntHeader }) => (hasntHeader ? 1 : 0)};
  }
`

const Header = styled('div')`
  ${Headers};
  ${tw(['mb-q32'])};
  color: ${({ color, theme }) =>
    theme.backgroundColor ? color : theme.logoFill};
`

const RightCol = styled('div')`
  ${tw(['flex', 'flex-col', 'items-start'])};
  ${({ grid }) =>
    ifElse(
      equals('left'),
      constant(ColumnEight),
      constant(ColumnThree)
    )(grid)};
`

const Text = styled('div')`
  ${RichText};
  & h2 {
    ${tw(['max-w-xs'])};
  }
  & h3 {
    ${tw(['max-w-xs'])};
    color: ${({ color, theme }) =>
      theme.backgroundColor ? color : theme.logoFill};
  }
`

export const WorkImageCaption = ({ color, items, primary, sliderId }) => (
  <Container>
    <RowWrapper
      hasntImage={isNil(primary.sicimage && primary.sicimage.localFile)}
    >
      <LeftCol
        grid={primary.sicgrid}
        hasntHeader={isNil(primary.sicheader && primary.sicheader.html)}
      >
        {unless(isNil, () =>
          includes('><', primary.sicheader.html) ? (
            false
          ) : (
            <Header
              {...{ color }}
              dangerouslySetInnerHTML={{ __html: primary.sicheader.html }}
            />
          )
        )(primary.sicheader && primary.sicheader.html)}
        {unless(isNil, () => (
          <div
            className={css`
              ${tw('w-full')};
            `}
          >
            <Img src={primary.sicimage} />
          </div>
        ))(primary.sicimage && primary.sicimage.localFile)}
        {unless(isNil, () => (
          <Text
            {...{ color }}
            dangerouslySetInnerHTML={{ __html: primary.siccaption }}
          />
        ))(primary.siccaption)}
      </LeftCol>
      <RightCol grid={primary.sicgrid}>
        {safeMap(item => (
          <Fragment key={uuid()}>
            {isNil(item.sictextlink) &&
              item.sictext && item.sictext.html && !item.sictext.html.includes('></') && (
                <Text
                  key={uuid()}
                  {...{ color }}
                  dangerouslySetInnerHTML={{ __html: item.sictext.html }}
                />
              )}
          </Fragment>
        ))(items)}
        {items[0].sictextimage && (
          <div
            className={css`
              ${tw('w-full')};
            `}
          >
            <Slider
              items={items.map(({ sictextimage }) => ({
                image: sictextimage,
              }))}
              {...{ sliderId }}
            />
          </div>
        )}
      </RightCol>
    </RowWrapper>
  </Container>
)
