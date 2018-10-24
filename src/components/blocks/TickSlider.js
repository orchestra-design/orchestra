/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'
import { compose, lifecycle, pure } from 'recompose'
import { connect } from 'react-redux'

import { countJumbo } from '../../actions'

import { equals, isNil, length, not, unless } from '../../helpers'

import {
  ButtonSmallText,
  Container,
  ImageForTickSlider,
  Pager,
  SimpleRow,
} from '../elements'

const Slide = styled('div')`
  ${tw(['relative', 'w-full'])};
  height: 64vw;
  @media (min-width: 768px) {
    height: 86vh;
  }
`

const Caption = styled('div')`
  ${ButtonSmallText};
  ${SimpleRow} ${tw([
    'absolute',
    'items-center',
    'pin-b',
    'pin-l',
    'mb-q12',
    'ml-q12',
    'z-10',
  ])};
  color: ${({ color }) => (color ? '#000000' : '#ffffff')};
`

const CaptionLink = styled(Link)`
  ${tw(['no-underline', 'relative'])}
  color: ${({ color }) => (color ? '#000000' : '#ffffff')};
  &::before {
    ${tw(['absolute', 'border', 'border-solid', 'pin'])};
    border-color: transparent;
    box-shadow: none;
    content: '';
    margin: -0.125rem -0.35rem;
    transform: translateY(-0.075);
    transition: all 200ms ease-in-out;
    z-index: -1;
  }
  &:hover::before {
    background-color: ${({ color }) => (color ? '#ffffff' : '#000000')};
    box-shadow: ${({ color }) => color && '0 0 1.5rem rgba(0,0,0,0.24)'};
  }
  &::after {
    ${tw(['absolute', 'block', 'pin-r', 'pin-t'])};
    color: transparent;
    content: attr(data);
    transform: translateX(0%);
  }
  &:hover::after {
    ${tw(['hidden', 'screen:block'])}
    color: ${({ color }) => (color ? '#000000' : '#ffffff')};
    transform: translateX(112%);
  }
`

const enhance = compose(
  connect(
    ({ jumboCount }) => ({ jumboCount }),
    { countJumbo }
  ),
  pure,
  lifecycle({
    state: {},
    componentDidMount() {
      const intervalId = setInterval(() => {
        not(this.props.hiddenDown) &&
          this.props.countJumbo(
            equals(this.props.jumboCount, length(this.props.image) - 1)
              ? 0
              : this.props.jumboCount + 1
          )
      }, 6000)
      this.setState({ intervalId: intervalId })
    },
    componentWillUnmount() {
      clearInterval(this.state.intervalId)
    },
  })
)

export const TickSlider = enhance(({ image, countJumbo, jumboCount }) => {
  const increment = jumboCount < length(image) - 1 ? jumboCount + 1 : 0
  const color = image[jumboCount].theme === 'image-inverse'

  return (
    <Container
      className={css`
        ${tw(['flex', 'fex-col', 'items-center', 'screen:h-screen', 'relative'])};
        @media (max-width: 599px) {
          height: 100vw;
        }
      `}
    >
      {unless(isNil, () => (
        <Slide onClick={() => countJumbo(increment)}>
          <ImageForTickSlider count={jumboCount || 0} {...{ image }} />
          <Caption color={color ? 'yep' : ''}>
            <Pager length={length(image)} {...{ color }} />
            {image[jumboCount].link !== null ? (
              <CaptionLink
                to={image[jumboCount].link.url}
                data={image[jumboCount].worktitle.text}
                color={color ? 'yep' : ''}
              >
                {image[jumboCount].caption}
              </CaptionLink>
            ) : (
              image[jumboCount].caption
            )}
          </Caption>
        </Slide>
      ))(image[jumboCount || 0].image.localFile)}
    </Container>
  )
})
