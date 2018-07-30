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
  Headers, RichText, Row
} from '../elements'

import { 
  and, constant, equals, ifElse, isNil, 
  safeMap, unless, uuid 
} from '../../helpers'

const RowWrapper = styled('div')`
  ${Row};
  ${tw([
    'items-center', 'md:items-start',
    'py-q72', 'md:py-q200', 'relative'
  ])};
  ${({ hasntImage }) => and(hasntImage, tw(['items-baseline']))};
  color: ${({ theme }) => theme.color};
`

const LeftCol = styled('div')`
  ${tw(['md:text-right'])};
  ${({ grid }) => ifElse(equals('left'), 
    constant(ColumnTwoFive), 
    constant(ColumnThreeFive)
  )(grid)};
`
const Header = styled('div')`
  ${Headers};
  ${tw(['mb-q36'])};
  color: ${({ color, theme }) => theme.backgroundColor ? color : theme.logoFill};
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

const LinkText = styled('span')`
  ${ButtonSmallText};
  ${tw([
    'flex', 'flex-row', 'items-baseline',
    'px-q12'
  ])};
  ${BaseTransition};
  color: ${({ theme }) => theme.color};
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
  &:hover .link-text {
    ${tw([
      'bg-black', 'text-white',
      'shadow-none', 'shadow-elevate1'
    ])};
  }
`

export const WorkImageCaption = connect( 
  constant, { pageTransition }
)(({ color, items, pageTransition, primary }) => (
  <div 
    right-image={JSON.stringify(primary.sicimage)}
    sicgrid={primary.sicgrid}
    style={{position: 'relative'}}
    theme={primary.sictheme} 
  >
    <Container>
      <RowWrapper hasntImage={isNil(primary.sicimage && primary.sicimage.localFile)}>
        <LeftCol grid={primary.sicgrid} >
        {unless(isNil,() =>
          <Header
            {...{color}}
            dangerouslySetInnerHTML={{ __html: primary.sicheader.html }}
          />
        )(primary.sicheader)}
        {unless(isNil, () =>
          <div
            className={css`${tw('md:hidden mb-q24 w-full')}`}
          ><Img 
            sizes={primary.sicimage.localFile.childImageSharp.sizes}
          /></div>
        )(primary.sicimage && primary.sicimage.localFile)}
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
                <div key={uuid()} ><Img key={uuid()} 
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
  </div>
))
