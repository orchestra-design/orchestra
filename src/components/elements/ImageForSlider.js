/* global tw */
import React, { Fragment } from 'react'
import { css } from 'react-emotion'
import { Transition, animated } from 'react-spring'

import { isArray, isNil, unless, uuid } from '../../helpers'
import { Img } from './Img'

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
        src={image}
        className={css`
          ${tw('pin')};
        `}
        style={{ position: 'absolute' }}
      />
    </animated.div>
  ))

export const ImageForSlider = ({ count, image }) => {
  const data = isArray(image) ? [image[count]] : [{ ...{ image } }]

  return (
    <Fragment>
      {unless(isNil, () => (
        <Fragment>
          <Img
            src={data[0].image}
            className={css`
              ${tw('pin')};
            `}
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
        </Fragment>
      ))(data)}
    </Fragment>
  )
}
