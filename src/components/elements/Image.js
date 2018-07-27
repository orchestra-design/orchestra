/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'
import { Transition, animated } from 'react-spring'
import { connect } from 'react-redux'

import { isArray, isNil, unless, uuid } from '../../helpers'

const Wrapper = styled('div')`
  ${tw(['absolute', 'pin'])}; 
  filter: blur(${({ backSlider, collapseTransition }) => (backSlider || collapseTransition) && '12px'}); 
  transform: scale(1.1);
  &::after {
    ${tw([
      'absolute', 'bg-black', 'hidden', 'opacity-25', 'pin'
    ])};
    ${({ backSlider, collapseTransition }) => (backSlider || collapseTransition) && 
      tw(['block'])};
    content: '';
  }
`

const Slide = css`
  ${tw('absolute pin')};  
  will-change: opacity;
`

const transitionGroup = data => data.map(({ image }) => 
  style => 
    <animated.div className={css`${Slide}`} style={{...style}} >
      <Img 
        sizes={image.localFile.childImageSharp.sizes} 
        className={css`${tw('pin')};`} 
        style={{position: 'absolute'}} 
      />
    </animated.div>
)

export const Image = connect(
  ({ 
    backImage, backSlider, 
    collapseTransition, jumboCount 
  }) => ({ 
    backImage, backSlider, 
    collapseTransition, jumboCount 
  })
)(({ backImage, backSlider, collapseTransition, image, jumboCount }) => {
  const parsedImage = JSON.parse(backImage)
  const data = isArray(image) ? [image[jumboCount]] : [{ image: parsedImage || image }]
  
  return (
    <Fragment>
      {unless(isNil, () =>
        <Wrapper
          {...{backSlider}}
          {...{collapseTransition}}
        >
          <Img 
            sizes={data[0].image.localFile.childImageSharp.sizes} 
            className={css`${tw('pin')};`} 
            style={{position: 'absolute'}} 
          />
          <Transition
            native
            items={data}
            keys={data.map(({image}) => `${image}${uuid()}`)}
            from={{ opacity: .0 }}
            enter={{ opacity: 1 }} 
            leave={{ opacity: .0 }}
          >{ transitionGroup(data) }</Transition> 
        </Wrapper>
      )(jumboCount)}
    </Fragment>
  )
})
