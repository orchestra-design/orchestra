/* global tw */
import React from 'react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import styled, { css } from 'react-emotion'

import { imageSizes } from '../../helpers'

import { 
  BaseTransition, ImageLinkTransition 
} from './Transitions'
import { Description, Heading6 } from './Typography'

const Image = css`
  ${tw('pin')};
`

const HoverImage = css`
  ${Image};
  ${ImageLinkTransition};
  ${tw('opacity-0')};
`

const LinkedImage = styled(Link)`
  ${tw([
    'flex', 
    'hover:shadow-elevate1',
    'no-underline', 'overflow-hidden',
    'relative', 'w-full', 'h-full'
  ])};
  ${BaseTransition};
  
  &:hover {
    & .${HoverImage} {
      ${tw('opacity-100')};
    }
    & .link-hover {
      ${tw('opacity-100')};
    }
  }
`

const TitleWrapper = styled('div')`
  ${tw([
    'absolute', 
    'flex', 'flex-col', 'h-1/2', 
    'justify-end', 'screen:opacity-0', 
    'pin-b', 'pin-l', 'pin-r',
  ])}; 
  ${BaseTransition};
  background: linear-gradient(180deg, 
    rgba(0, 0, 0, 0) 0%, 
    rgba(0, 0, 0, 0.64) 100%);
`

const Row = styled('div')`
  ${tw([
    'flex', 'flex-row', 'flex-no-wrap',
    'items-baseline', 'justify-between',
    'p-q24'
  ])}; 
`

const Title = styled('h3')`
  ${Heading6};
  ${tw(['mr-1/6', 'w-1/2'])};
  color: ${({color}) => color};
`

const DescriptionText = styled('span')`
  ${Description};
  ${tw([
    'ml-auto', 'text-white',
    'min-w-1/2'
  ])};
  line-height: 1.125rem;
`

export const LinkImage = ({
  color, description, link, image, 
  hoverimage, title
}) => (
  <LinkedImage
    to={link.url}
  >
    <Img
      className={Image}
      sizes={imageSizes(image)}
      style={{position: 'absolute'}}
    />
    <Img
      className={HoverImage}
      sizes={imageSizes(hoverimage)}
      style={{position: 'absolute'}}
    />
    <TitleWrapper className="link-hover" >
      <Row>
        <Title
          {...{color}}
        >{ title.text }</Title>
        <DescriptionText
        >{ description }</DescriptionText>
      </Row>
    </TitleWrapper>
  </LinkedImage>
)