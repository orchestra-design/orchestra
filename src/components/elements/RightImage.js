/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import Img from 'gatsby-image'
import { Transition, animated } from 'react-spring'

import { Container } from './Containers'
import { ColumnTwoFive, ColumnThreeFive } from './Grids'
import { constant, F, isNil, pathOr, unless, uuid, equals } from '../../helpers'

const Slide = css`
  ${tw(['absolute', 'pin'])};
  will-change: opacity;
`

const transitionGroup = data =>
  data.map(({ image }) => style => (
    <animated.div
      className={css`
        ${Slide};
      `}
      style={{ ...style }}
    >
      <Img
        className={css`
          ${tw('pin')};
        `}
        fluid={image.localFile.childImageSharp.fluid}
        style={{ position: 'absolute' }}
      />
    </animated.div>
  ))

export const RightImage = ({ rightImage, sicgrid }) => {
  const parsedImage = JSON.parse(rightImage)
  const safeImage = unless(
    isNil,
    pathOr(false, ['localFile'], parsedImage) ? constant(parsedImage) : F
  )(parsedImage)
  const data = [{ image: safeImage }]

  return (
    <Container
      className={css`
        ${tw(['fixed', 'flex', 'h-full', 'items-center'])};
      `}
    >
      {safeImage && (
        <div
          className={css`
            ${equals('left', sicgrid) ? ColumnTwoFive : ColumnThreeFive};
            ${tw(['md:p-0', 'relative'])};
          `}
        >
          <Img fluid={data[0].image.localFile.childImageSharp.fluid} />
          <Transition
            native
            items={data}
            keys={data.map(({ image }) => `${image}${uuid()}`)}
            from={{ opacity: 0.0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0.0 }}
          >
            {transitionGroup(data)}
          </Transition>
        </div>
      )}
    </Container>
  )
}
