/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
// import Link from 'gatsby-link'
import { connect } from 'react-redux'

import { pageTransition } from '../../actions'

import {
  // BaseTransition,
  // ButtonText,
  ColumnThreeFive,
  ColumnTwoFive,
  Container,
  // Description,
  Headers,
  Img,
  Heading0,
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
} from '../../helpers'

const RowWrapper = styled('div')`
  ${Row};
  ${tw(['items-center', 'md:items-start', 'my-q48', 'md:my-q72', 'relative'])};
  ${({ hasntImage }) => and(hasntImage, tw(['items-baseline']))};
  color: ${({ theme }) => theme.color};
`

const LeftCol = styled('div')`
  ${Headers};
  ${tw(['md:text-right'])};
  ${({ grid }) =>
    ifElse(equals('left'), constant(ColumnTwoFive), constant(ColumnThreeFive))(
      grid
    )};
`

const RightCol = styled('div')`
  ${tw(['flex', 'flex-col', 'items-start'])};
  ${({ grid }) =>
    ifElse(equals('left'), constant(ColumnThreeFive), constant(ColumnTwoFive))(
      grid
    )};
`

const Text = styled('div')`
  ${RichText};
  & h2 {
    ${tw(['max-w-xs'])};
  }
  & li::after {
    border-radius: 9999px;
  }
`
/* 
const LinkImage = css`
  ${tw([
    'absolute',
    'hidden',
    'screen:block',
    'opacity-0',
    'overflow-hidden',
    'shadow-elevate1',
  ])};
  bottom: 3rem;
  height: 0;
  right: -1rem;
  width: 15rem;
  transition: opacity 0.4s ease-in-out;
`

const LinkText = styled('div')`
  ${ButtonText};
  ${tw([
    'flex',
    'flex-col',
    'sm:flex-row',
    'items-baseline',
    'justify-between',
    'px-q12',
    'py-q4',
    'sm:py-q8',
    'w-full',
  ])};
  ${BaseTransition};
  color: ${({ theme }) => theme.color};
  & .link {
    ${tw(['w-full', 'pr-q12', 'whitespace-no-wrap'])};
  }
  & p {
    ${tw(['m-0', 'w-full', 'whitespace-no-wrap'])};
  }
`

const LinkStyles = css`
  ${tw([
    'flex',
    'items-start',
    'no-underline',
    'mb-q8',
    'md:mb-q12',
    'relative',
    'screen:w-full',
  ])};
  &:hover .${LinkImage} {
    ${tw(['h-auto', 'opacity-100'])};
  }
  &:hover .link-text {
    ${tw(['bg-black', 'text-white', 'shadow-none', 'shadow-elevate1'])};
  }
`
 */
export const ImageCaptionWithDigits = connect(
  constant,
  { pageTransition }
)(({ i, items, /* lang, pageTransition, */ primary }) => (
  <Container>
    <RowWrapper
      hasntImage={isNil(primary.sicimage)}
    >
      <LeftCol grid={primary.sicgrid}>
        {unless(isNil, () => (
          <div
            className={css`
              ${tw('max-w-xs mb-q24 w-full')};
            `}
          >
            <Img src={primary.sicimage} />
          </div>
        ))(primary.sicimage)}
      </LeftCol>
      <RightCol grid={primary.sicgrid}>
        <div className={Row}>
        {unless(isNil, () => (
          <div
            className={css`
              ${Heading0};
              ${tw('mb-q24 pr-q24')};
            `}
          >
            {i + 1}
          </div>
        ))(i)}
        {safeMap(item => (
          <Fragment key={uuid()}>
            {isNil(item.sictextlink) &&
              unless(isNil, () => (
                <Text
                  key={uuid()}
                  dangerouslySetInnerHTML={{ __html: item.sictext.html }}
                />
              ))(item.sictext)}
          </Fragment>
        ))(items)}
        </div>
        {/* <div
          className={css`
            ${Description};
            ${tw('mb-q24')};
          `}
        >
          {lang.includes('ru') ? 'Ключевые проекты' : 'Key projects'}
        </div> */}
        {/* <div
          className={css`
            ${tw([
              'flex',
              'flex-col',
              'w-full',
            ])};
          `}
        >
          {safeMap(item => (
            <Fragment key={uuid()}>
              {unless(isNil, () => (
                <Link
                  key={uuid()}
                  className={LinkStyles}
                  onClick={() => pageTransition()}
                  to={item.sictextlink.url}
                >
                  <LinkText
                    key={uuid()}
                    className="link-text"
                    dangerouslySetInnerHTML={{ __html: item.sictext.html }}
                  />
                  {unless(isNil, () => (
                    <div key={uuid()} className={LinkImage}>
                      <Img key={uuid()} src={item.sictextimage} />
                    </div>
                  ))(item.sictextimage)}
                </Link>
              ))(item.sictextlink)}
            </Fragment>
          ))(items)}
        </div> */}
      </RightCol>
    </RowWrapper>
  </Container>
))
