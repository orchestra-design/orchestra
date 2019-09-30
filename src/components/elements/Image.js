/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import { Transition, animated } from 'react-spring'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'

import {
  constant,
  F,
  isArray,
  isNil,
  pathOr,
  unless,
  uuid,
} from '../../helpers'

import { Img } from './Img'

const Wrapper = styled('div')`
  ${tw(['absolute', 'pin'])};
  &::after {
    ${tw(['absolute', 'bg-black', 'hidden', 'pin'])};
    ${({ backSlider }) => backSlider && tw(['block'])};
    content: '';
    opacity: 0.95;
  }
`

const Slide = css`
  ${tw('absolute pin')};
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
        src={image}
        style={{ position: 'absolute' }}
      />
    </animated.div>
  ))

export const Image = compose(
  connect(({ backImage, backSlider, jumboCount }) => ({
    backImage,
    backSlider,
    jumboCount,
  })),
  pure
)(({ backImage, backSlider, image, jumboCount }) => {
  const safeImage = unless(
    isNil,
    pathOr(false, ['localFile'], backImage) ? constant(backImage) : F
  )(backImage)
  const data = isArray(image)
    ? [image[jumboCount]]
    : [{ image: safeImage || image }]
  const hasImage = xs =>
    xs.some(x => x && x.image && x.image.localFile !== null)
  return (
    <Fragment>
      {hasImage(data) &&
        !isNil(jumboCount) && (
          <Wrapper {...{ backSlider }}>
            <Img
              className={css`
                ${tw('pin')};
              `}
              src={data[0].image}
              style={{ position: 'absolute' }}
            />
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
          </Wrapper>
        )}
    </Fragment>
  )
})
