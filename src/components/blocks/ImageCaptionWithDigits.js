/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import { connect } from 'react-redux'

import { pageTransition } from '../../actions'

import { 
  BaseTransition, ButtonSmallText, ButtonText, 
  ColumnThreeFive, ColumnTwoFive, Container, 
  Description, Headers, Heading0, RichText, Row
} from '../elements'

import { 
  and, constant, equals, ifElse, isNil, 
  safeMap, unless, uuid 
} from '../../helpers'

const RowWrapper = styled('div')`
  ${Row};
  ${tw([
    'items-center', 'md:items-start',
    'py-q72', 'relative'
  ])};
  ${({ hasntImage }) => and(hasntImage, tw(['items-baseline']))};
  color: ${({ theme }) => theme.color};
`

const LeftCol = styled('div')`
  ${Headers};
  ${tw(['md:text-right'])};
  ${({ grid }) => ifElse(equals('left'), 
    constant(ColumnTwoFive), 
    constant(ColumnThreeFive)
  )(grid)};
`

const RightCol = styled('div')`
  ${tw([
    'flex', 'flex-col', 'items-start'
  ])};
  ${({ grid }) => ifElse(equals('left'), 
    constant(ColumnThreeFive), 
    constant(ColumnTwoFive)
  )(grid)};
`

const Text = styled('div')`
  ${RichText};
  & h2 {
    ${tw(['max-w-xs'])};
  }
`

const LinkImage = css`
  ${tw([
    'absolute', 'hidden', 'screen:block',
    'opacity-0', 'shadow-elevate1'
  ])};
  bottom: 3rem;
  right: 7.5vw;
  width: 15rem;
  transition: opacity .4s ease-in-out;
`

const LinkText = styled('span')`
  ${ButtonSmallText};
  ${tw([
    'flex', 'flex-row', 'items-baseline',
    'px-q12', 'py-q6'
  ])};
  ${BaseTransition};
  color: ${({ theme }) => theme.color};
  font-variant-caps: all-small-caps;
  & .link {
    ${ButtonText};
    ${tw(['mr-q4'])};
  }
`

const LinkStyles = css`
  ${tw([
    'flex', 'items-start',
    'no-underline', 'mb-q16', 
    'md:mb-q24', 'relative', 'screen:w-full'
  ])};
  &:hover .${LinkImage} {
    ${tw(['opacity-100'])};
  }
  &:hover .link-text {
    ${tw([
      'bg-black', 'text-white',
      'shadow-none', 'shadow-elevate1'
    ])};
  }
`

export const ImageCaptionWithDigits = connect( 
  constant, { pageTransition }
)(({ i, items, lang, pageTransition, primary }) => (
  <Container>
    <RowWrapper hasntImage={isNil(primary.sicimage && primary.sicimage.localFile)}>
      <LeftCol grid={primary.sicgrid} >
      {unless(isNil, () =>
        <div
          className={css`${tw('md:hidden max-w-xs mb-q24 w-full')}`}
        ><Img 
          sizes={primary.sicimage.localFile.childImageSharp.sizes}
        /></div>
      )(primary.sicimage && primary.sicimage.localFile)}
      {unless(isNil, () =>
        <div className={css`
          ${Heading0}; 
          ${tw('mb-q24')}
        `} >{ i + 1 }</div>
      )(i)}
      </LeftCol>
      <RightCol grid={primary.sicgrid} >
      {safeMap(item => (
        <Fragment key={uuid()} >        
        {isNil(item.sictextlink) && unless(isNil,() =>
          <Text key={uuid()} 
            dangerouslySetInnerHTML={{ __html: item.sictext.html }}
          />
        )(item.sictext)}
        </Fragment>
      ))(items)}
      <div className={css`
        ${Description}; 
        ${tw('mb-q24')}
      `} >{ lang.includes('ru') ? 'Ключевые проекты' : 'Key projects' }</div>
      {safeMap(item => (
        <Fragment key={uuid()} >
        {unless(isNil,() =>
          <Link key={uuid()}
            className={LinkStyles}
            onClick={() => pageTransition()}
            to={item.sictextlink.url}
          >
            <LinkText key={uuid()}
              className="link-text"
              dangerouslySetInnerHTML={{ __html: item.sictext.html }}
            />
            {unless(isNil,() =>
              <div key={uuid()}
                className={LinkImage}
              ><Img key={uuid()} 
                  sizes={item.sictextimage.localFile.childImageSharp.sizes}
                /></div>
            )(item.sictextimage)}
          </Link>
        )(item.sictextlink)}
        </Fragment>
      ))(items)}
      </RightCol>
    </RowWrapper>
  </Container>
))
