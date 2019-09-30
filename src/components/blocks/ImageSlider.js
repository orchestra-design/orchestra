/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { compose, pure, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { setImage, sliderCount } from '../../actions'

import {
  ColumnFiveSix,
  Container,
  ImageForSlider,
  JustPager,
  NextButton,
  PreviousButton,
  RichTextSmall,
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
  // includes,
} from '../../helpers'

// const BackImage = styled('div')`
//   ${tw([
//     'absolute',
//     'hidden',
//     'md:block',
//     'mt-q24',
//     'ml-q48',
//     'pin-t',
//     'pin-l',
//     'w-full',
//   ])};
// `

const Slide = styled('div')`
  ${({ hasText, length }) =>
    !hasText || length ? ColumnFiveSix : tw(['w-full'])};
  ${tw(['relative'])};
  height: 64vw;
  @media (min-width: 768px) {
    height: calc(64vw * 5 / 6);
  }
  @media (min-width: 1200px) {
    height: calc(1200px * 5 / 6 * 0.64);
  }
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
  height: 64vw;
  @media (min-width: 768px) {
    height: calc(64vw * 5 / 6);
  }
  @media (min-width: 1200px) {
    height: calc(1200px * 5 / 6 * 0.64);
  }
`

const TextWrapper = styled('div')`
  ${tw(['mb-q36', 'mt-q36', 'md:mt-auto', 'pin-b', 'pin-l', 'w-full'])};
  color: ${({ theme }) => theme.logoFill};
`

const Text = styled('div')`
  ${RichTextSmall};
  ${tw(['ml-auto'])};
  ${tw([
    'md:px-q12',
    'mb-q24',
    'md:mb-0',
    'w-full',
    'md:w-2/3',
    'desktop:w-3/4',
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

export const ImageSlider = compose(
  connect(
    pick(['backSlider', 'sliderCounter', 'storedTheme']),
    { setImage, sliderCount }
  ),
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
    // backSlider,
    counter,
    items,
    primary,
    setImage,
    sliderCounter,
    sliderId,
    storedTheme,
  }) => {
    const itemsLength = length(items)
    const image = items.map(({ imgimage }) => ({ image: imgimage }))
    const previous = previousCount(itemsLength, sliderCounter[sliderId] || 0)
    const next = nextCount(itemsLength, sliderCounter[sliderId] || 0)
    const toBackImage = where => image[where].image

    return (
      <div
        className={css`
          ${tw('my-q112 desktop:my-q200 relative')};
          ${gt(itemsLength, 1) && tw('flex flex-col min-h-screen justify-center')};
        `}
      >
        <div
          className={css`
            ${tw('relative')};
          `}
        >
          {/* and(
            and(gt(itemsLength, 1), !includes('white', storedTheme)),
            <BackImage>
              <Container
                className={css`
                  ${tw('relative')};
                `}
              >
                <Slide
                  className={css`
                    &::after {
                      ${!includes('white', storedTheme) &&
                        tw(['absolute', 'block', 'pin'])};
                      background: linear-gradient(
                        180deg,
                        rgba(0, 0, 0, ${backSlider ? 0.96 : 0.24}) 0%,
                        rgba(0, 0, 0, 0.96) 100%
                      );
                      content: '';
                    }
                  `}
                  hasText={isNil(primary.imgtext && primary.imgtext.html)}
                  length={gt(itemsLength, 1)}
                >
                  <ImageForSlider {...{ image }} count={next} />
                </Slide>
              </Container>
            </BackImage>
          ) */}
          <Container
            className={css`
              ${tw('relative')};
            `}
          >
            {unless(isNil, () => (
              <Slide
                hasText={isNil(primary.imgtext && primary.imgtext.html)}
                length={gt(itemsLength, 1)}
              >
                <ImageForSlider
                  count={sliderCounter[sliderId] || 0}
                  {...{ image }}
                  {...{ storedTheme }}
                />
              </Slide>
            ))(items && items[sliderCounter[sliderId] || 0].imgimage.localFile)}
            {and(
              gt(itemsLength, 1),
              <JustPager
                count={sliderCounter[sliderId] || 0}
                length={itemsLength}
              />
            )}
          </Container>
          {unless(isNil, () => (
            <TextWrapper {...{ storedTheme }}>
              <Container>
                <Text
                  dangerouslySetInnerHTML={{ __html: primary.imgtext.html }}
                />
              </Container>
            </TextWrapper>
          ))(primary.imgtext)}
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
                    setImage(toBackImage(previous))
                  }}
                />
                <NextButton
                  {...{ storedTheme }}
                  onClick={() => {
                    counter(next)
                    setImage(toBackImage(next))
                  }}
                />
              </Container>
            </NavContainer>
          )}
        </div>
      </div>
    )
  }
)
