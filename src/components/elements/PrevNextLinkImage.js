/* global tw */
import React from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { pageTransition } from '../../actions'
import { constant } from '../../helpers'

import { Img } from './Img'
import { BaseTransition, ImageLinkTransition } from './Transitions'
import { DescriptionSemibold, Heading6 } from './Typography'

const ImageWrapper = styled('div')`
  ${tw(['h-full', 'w-full'])};
`

const Image = css`
  ${tw(['pin'])};
`

const HoverImage = css`
  ${tw(['pin', 'opacity-0'])};
  ${ImageLinkTransition};
`

const LinkedImage = styled(Link)`
  ${tw(['flex', 'no-underline', 'relative', 'w-full', 'h-full'])};
  ${BaseTransition};

  &:hover {
    & .${HoverImage} {
      ${tw(['shadow-elevate1', 'opacity-100'])};
    }
  }
`

const TitleWrapper = styled('div')`
  ${tw([
    'absolute',
    'flex',
    'flex-col',
    'h-1/2',
    'justify-end',
    'pin-b',
    'pin-l',
    'pin-r',
  ])};
  ${BaseTransition};
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.64) 100%
  );
`

const Row = styled('div')`
  ${tw([
    'flex',
    'flex-row',
    'flex-no-wrap',
    'items-baseline',
    'justify-between',
    'p-q24',
  ])};
`

const Title = styled('h3')`
  ${Heading6};
  ${tw(['mr-1/6', 'text-white', 'w-1/2'])};
`

const DescriptionText = styled('span')`
  ${DescriptionSemibold};
  ${tw(['ml-auto', 'text-white', 'min-w-1/2'])};
  line-height: 1.125rem;
`

export const PrevNextLinkImage = connect(
  constant,
  { pageTransition }
)(
  ({
    statement,
    link,
    image,
    children,
    hoverimage,
    pageTransition,
    title,
    worksGrid,
  }) => (
    <LinkedImage onClick={pageTransition} to={link.url}>
      <ImageWrapper>
        <Img className={Image} src={image} style={{ position: 'absolute' }} />
        <Img
          className={HoverImage}
          src={hoverimage}
          style={{ position: 'absolute' }}
        />
      </ImageWrapper>
      <TitleWrapper className="link-hover">
        <Row>
          <Title {...{ worksGrid }}>{statement.text}</Title>
          <DescriptionText>{title}</DescriptionText>
        </Row>
      </TitleWrapper>
      {children}
    </LinkedImage>
  )
)
