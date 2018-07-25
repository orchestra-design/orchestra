/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import Img from 'gatsby-image'
import { Transition, animated } from 'react-spring'

import { Container } from './Containers'
import { ColumnTwoFive } from './Grids'
import { isNil, unless, uuid } from '../../helpers'

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

export const RightImage = ({ rightImage }) => {
  const data =  [{image: unless(isNil, JSON.parse)(rightImage)}]
  
  return (
    <Container className={css`${tw('flex h-full items-center')}`}>
      {unless(isNil, () =>
        <div className={css`
          ${ColumnTwoFive}; 
          ${tw('md:-mx-q12 relative')};
          height: calc((2 / 5 * 100vw) - 1.5rem);
        `} >
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
        </div>
      )(RightImage)}
    </Container>
  )
}
