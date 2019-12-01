/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import { compose, pure, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { sliderCount } from '../../actions'

import {
  Container,
  ImgForSlider,
  JustPager,
  NextButton,
  PreviousButton,
} from '../elements'

import {
  and,
  equals,
  gt,
  ifElse,
  isNil,
  length,
  unless,
  pick,
} from '../../helpers'

const Slide = styled('div')`
  ${tw(['relative', 'w-full'])};
`

const NavContainer = styled('div')`
  ${tw([
    'absolute',
    'flex',
    'justify-between',
    'items-center',
    'pin',
    'px-q32',
    'md:px-1/12',
    'desktop:px-1/6',
  ])};
`

const previousCount = (length, count) =>
  ifElse(
    () => equals(0, count),
    () => parseInt(length - 1),
    () => parseInt(count - 1)
  )()

const nextCount = (length, count) =>
  ifElse(
    () => equals(length - 1, count),
    () => parseInt(0),
    () => parseInt(count + 1)
  )()

export const Slider = compose(
  connect(pick(['backSlider', 'sliderCounter', 'storedTheme']), {
    sliderCount,
  }),
  pure,
  withHandlers({
    counter: ({ sliderCount, sliderCounter, sliderId }) => value => {
      unless(
        isNil,
        () =>
          sliderCounter[sliderId] !== value &&
          sliderCount({ [sliderId]: value })
      )(sliderId)
    },
  })
)(
  ({
    counter,
    items,
    sliderCounter,
    sliderId,
    storedTheme,
  }) => {
    const itemsLength = length(items)
    const previous = previousCount(itemsLength, sliderCounter[sliderId] || 0)
    const next = nextCount(itemsLength, sliderCounter[sliderId] || 0)

    return (
      <div
        className={css`
          ${tw('mb-q24 md:mb-q32 relative')};
        `}
      >
        <Fragment>
          {unless(isNil, () => (
            <Slide>
              <ImgForSlider
                count={sliderCounter[sliderId] || 0}
                image={items}
              />
            </Slide>
          ))(
            items &&
              items[sliderCounter[sliderId] || 0] &&
              items[sliderCounter[sliderId] || 0].image.localFile
          )}
          {and(
            gt(itemsLength, 1),
            <JustPager
              count={sliderCounter[sliderId] || 0}
              length={itemsLength}
            />
          )}
        </Fragment>
        {and(
          gt(itemsLength, 1),
          <NavContainer>
            <Container
              className={css`
                ${tw('flex justify-between items-center')};
              `}
            >
              <PreviousButton
                {...{ storedTheme }}
                onClick={() => {
                  counter(previous)
                }}
              />
              <NextButton
                {...{ storedTheme }}
                onClick={() => {
                  counter(next)
                }}
              />
            </Container>
          </NavContainer>
        )}
      </div>
    )
  }
)
