/* global tw */
import React, { Fragment } from 'react'
import { css } from 'react-emotion'
import Img from 'gatsby-image'
import { Transition, animated } from 'react-spring'

import { isArray, isNil, unless, uuid } from '../../helpers'

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

export const ImageForSlider = ({ count, image }) => {
  const data = isArray(image) ? [image[count]] : [{...{image}}]
  
  return (
    <Fragment>
      {unless(isNil, () =>
        <Fragment>
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
        </Fragment>
      )(data)}
    </Fragment>
  )
}
