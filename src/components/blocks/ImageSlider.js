/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { withStateHandlers } from 'recompose'

import { 
  ColumnFiveSix, Container, ImageForSlider, 
  JustPager, NextButton, PreviousButton
} from '../elements'

import { 
  and, equals, gt, ifElse,
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
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.64) 100%);
    content: '';
  }
`

const Slide = styled('div')`
  ${ColumnFiveSix};
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
    'absolute', 'flex', 'h-full', 
    'justify-between', 'items-center', 
    'pin', 'px-1/12'
  ])};
  transform: translateY(-.75rem);
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

export const ImageSlider = withStateHandlers(
  ({ init = 0 }) => ({ count: init }),
  {
    counter: () => value => ({
      count: value
    })
  }
)(({ count, counter, items, primary }) => {
  const itemsLength = length(items)
  const image = items.map(({ imgimage }) => ({ image: imgimage }))
  const previous = previousCount(itemsLength, count)
  const next = nextCount(itemsLength, count)
  
  return (
    <div
      className={css`${tw('my-q48 screen:my-q112 desktop:my-q200 relative')}`}
    >
      {and(gt(itemsLength, 1),
        <BackImage>
          <Container
            className={css`${tw('relative')}`}
          >
            <Slide className={After}>
              <ImageForSlider 
                {...{image}}
                count={next}
              />
            </Slide>
          </Container>
        </BackImage>
      )}    
      <Container
        className={css`${tw('relative')}`}
      >
        {unless(isNil, () =>
          <Slide>
            <ImageForSlider 
              {...{count}}
              {...{image}}
            />
          </Slide>
        )(items && items[count].imgimage.localFile)}
        {and(gt(itemsLength, 1),
          <NavContainer>
            <PreviousButton onClick={() => counter(previous)} />
            <NextButton onClick={() => counter(next)} />
          </NavContainer>
        )}
        {and(gt(itemsLength, 1),
          <JustPager count={count} length={itemsLength} />
        )}
      </Container>
    </div>
  )
})
