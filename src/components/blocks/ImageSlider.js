/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { compose, withStateHandlers } from 'recompose'
import { connect } from 'react-redux'

import { setImage } from '../../actions'

import { 
  ColumnFiveSix, Container, ImageForSlider, 
  JustPager, NextButton, PreviousButton, RichTextSmall
} from '../elements'

import { 
  and, equals, gt, ifElse, includes,
  isNil, length, unless, 
} from '../../helpers'

const BackImage = styled('div')`
  ${tw([
    'absolute', 'hidden', 'md:block', 
    'mt-q24', 'ml-q48', 'pin-t', 
    'pin-l', 'w-full',
  ])};
`

const After = css`
  &::after {
    ${tw([
      'absolute', 'block', 'pin'
    ])};
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.72) 100%);
    content: '';
  }
`

const Slide = styled('div')`
  ${({ hasText, length }) => hasText || length ? ColumnFiveSix : tw(['w-full'])};
  ${tw([
    'relative'
  ])};
  height: 64vw;
  @media(min-width: 768px) {
    height: calc(64vw * 5 / 6);
  }
  @media(min-width: 1200px) {
    height: calc(1200px * 5 / 6 * .64);
  }
`

const NavContainer = styled('div')`
  ${tw([
    'absolute', 'flex',
    'justify-between', 'items-center', 
    'pin', 'px-q32', 'md:px-1/12', 'desktop:px-1/6', 
  ])};
  height: 64vw;
  @media(min-width: 768px) {
    height: calc(64vw * 5 / 6);
  }
  @media(min-width: 1200px) {
    height: calc(1200px * 5 / 6 * .64);
  }
`

const TextWrapper = styled('div')`
  ${tw([
    'md:absolute', 'mt-q36',
    'pin-t', 'pin-l', 'w-full',
  ])};
  color: ${({ theme }) => theme.logoFill};
  @media(min-width: 768px) {
    margin-top: calc(64vw * 1 / 2);
  }
  @media(min-width: 1200px) {
    margin-top: calc(1200px * 1 / 2 * .64);
  }
`

const Text = styled('div')`
  ${RichTextSmall};
  ${tw(['ml-auto'])};
  ${tw([
    'md:px-q12', 'mb-q24', 'md:mb-0',
    'w-full', 'md:w-1/2', 'desktop:w-1/3'
  ])};
  min-width: calc((1 / 3 * 100%) - 1.5rem);
  @media(min-width: 768px) {
    max-width: calc((1 / 2 * 100%) - 1.5rem);
  }
  @media(min-width: 1200px) {
    max-width: calc((1 / 3 * 100%) - 1.5rem);
  }
`

const previousCount = (length, count) => ifElse(
  () => equals(0, count),
  () => parseInt(length - 1),
  () => parseInt(count - 1)
)()

const nextCount = (length, count) => ifElse(
  () => equals((length - 1), count),
  () => parseInt(0),
  () => parseInt(count + 1)
)()

export const ImageSlider = compose(
  connect(
    ({ storedTheme }) => ({ storedTheme }),
    { setImage }
  ),
  withStateHandlers(
    ({ init = 0 }) => ({ count: init }),
    {
      counter: () => value => ({
        count: value
      })
    }
  )
)(({ storedTheme, count, counter, items, primary, setImage, theme }) => {
  const itemsLength = length(items)
  const image = items.map(({ imgimage }) => ({ image: imgimage }))
  const previous = previousCount(itemsLength, count)
  const next = nextCount(itemsLength, count)
  const toBackImage = where => JSON.stringify(image[where].image)  
  
  return (
    <div
      className={css`${tw('screen:h-screen my-q112 screen:my-q112 desktop:my-q200 relative')}`}
      image={includes('image', theme) ? JSON.stringify(image[count].image) : null}
      slider={includes('image', theme) ? 'true' : 'false'}
      {...{theme}}
    >
      {and(gt(itemsLength, 1),
        <BackImage>
          <Container
            className={css`${tw('relative')}`}
          >
            <Slide 
              className={After}
              hasText={isNil(primary.imgtext)}
              length={gt(itemsLength, 1)}
            ><ImageForSlider 
                {...{image}}
                count={next}
              /></Slide>
          </Container>
        </BackImage>
      )}    
      <Container
        className={css`${tw('relative')}`}
      >{unless(isNil, () =>
          <Slide
            hasText={isNil(primary.imgtext)}
            length={gt(itemsLength, 1)}
          >
            <ImageForSlider 
              {...{count}}
              {...{image}}
            />
          </Slide>
        )(items && items[count].imgimage.localFile)}
        {and(gt(itemsLength, 1),
          <JustPager count={count} length={itemsLength} />
        )}</Container>
      {unless(isNil, () =>
        <TextWrapper>
          <Container>
            <Text
              dangerouslySetInnerHTML={{ __html: primary.imgtext.html }}
            />
          </Container>
        </TextWrapper>
      )(primary.imgtext)}
      {and(gt(itemsLength, 1),
        <NavContainer>
          <Container
            className={css`${tw('flex justify-between items-center',)}`}
          >
            <PreviousButton 
              onClick={() => {
                counter(previous)
                setImage(toBackImage(previous))
              }}
            />
            <NextButton
              {...{storedTheme}}
              onClick={() => {
                counter(next)
                setImage(toBackImage(next))
              }}
            />
          </Container>
        </NavContainer>
      )}
    </div>
  )
})
