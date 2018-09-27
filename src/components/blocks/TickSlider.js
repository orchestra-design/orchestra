/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'
import { compose, lifecycle, pure } from 'recompose'
import { connect } from 'react-redux'

import { changeTheme, countJumbo } from '../../actions'

import { camelCase, equals, length, not } from '../../helpers'

import {
  ButtonSmallText,
  Heading2,
  JustImage,
  Pager,
  SimpleRow,
} from '../elements'

const Container = styled('div')`
  ${tw([
    'flex',
    'flex-col',
    'justify-end',
    'mx-auto',
    'max-w-desktop',
    'relative',
  ])};
  @media (max-width: 599px) {
    height: auto;
  }
  @media (min-width: 600px) {
    height: 100vh;
  }
`
const Heading = styled('h1')`
  ${Heading2};
  ${tw([
    'max-w-xs',
    'screen:max-w-lg',
    'pt-q72',
    'screen:pb-q72',
    'pl-q24',
    'relative',
  ])};
  color: ${({ theme }) => theme.logoFill};
  text-shadow: ${({ theme }) =>
    theme.logoShadow && '0 0 1.5rem rgba(0,0,0,0.24)'};
  transition: all 200ms ease-in-out;
`

const Caption = styled('div')`
  ${ButtonSmallText};
  ${SimpleRow} ${tw([
    'screen:fixed',
    'items-center',
    'pin-b',
    'pin-l',
    'p-q24',
    'z-10',
  ])};
  color: ${({ theme }) => theme.color};
`

const CaptionLink = styled(Link)`
  ${tw(['no-underline', 'relative'])}
  color: ${({ theme }) => theme.color};
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
    background-color: ${({ theme }) =>
      theme.color === '#ffffff' ? '#000000' : '#ffffff'};
    box-shadow: ${({ theme }) =>
      theme.logoShadow && '0 0 1.5rem rgba(0,0,0,0.24)'};
  }
  &::after {
    ${tw(['absolute', 'block', 'pin-r', 'pin-t'])};
    color: transparent;
    content: attr(data);
    transform: translateX(0%);
  }
  &:hover::after {
    color: ${({ theme }) => theme.color};
    transform: translateX(112%);
  }
`

const enhance = compose(
  connect(
    ({ hiddenDown, isMenu, jumboCount, storedTheme }) => ({
      hiddenDown,
      isMenu,
      jumboCount,
      storedTheme,
    }),
    { changeTheme, countJumbo }
  ),
  pure,
  lifecycle({
    state: {},
    componentDidMount() {
      /* const intervalId = setInterval(() => {
        not(this.props.hiddenDown) &&
          this.props.countJumbo(
            equals(this.props.jumboCount, length(this.props.image) - 1)
              ? 0
              : this.props.jumboCount + 1
          )
      }, 6000)
      this.setState({ intervalId: intervalId }) */
    },
    componentWillUnmount() {
      clearInterval(this.state.intervalId)
    },
  })
)

export const TickSlider = enhance(
  ({
    changeTheme,
    image,
    isMenu,
    hiddenDown,
    jumboCount,
    meta,
    storedTheme,
  }) => {
    // Theme
    const newTheme = camelCase(image[jumboCount].theme)
    not(isMenu) &&
      not(hiddenDown) &&
      not(equals(newTheme, storedTheme)) &&
      changeTheme(newTheme)

    return (
      <Container>
        <div
          className={css`
            ${tw('absolute pin screen:hidden')};
          `}
        >
          <JustImage image={image[jumboCount].image} />
        </div>
        <Heading
          dangerouslySetInnerHTML={{ __html: meta.data.description.html }}
        />
        {!hiddenDown && (
          <Caption>
            <Pager length={length(image)} />
            {image[jumboCount].link !== null ? (
              <CaptionLink
                to={image[jumboCount].link.url}
                data={image[jumboCount].worktitle.text}
              >
                {image[jumboCount].caption}
              </CaptionLink>
            ) : (
              image[jumboCount].caption
            )}
          </Caption>
        )}
      </Container>
    )
  }
)
