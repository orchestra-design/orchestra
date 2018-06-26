/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { Transition, animated } from 'react-spring'
import { compose, withState, withHandlers } from 'recompose'

const Container = styled('div')`
  ${tw('flex justify-center absolute pin bg-black items-center w-screen h-screen')};
`

const TextContainer = styled('div')`
  ${tw('text-center relative font-bold text-white z-30 sm:flex-grow')};
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: calc(18px + 36 * ((100vw - 320px) / 1280));
  text-shadow: 0px 0px 24px rgba(0, 0, 0, 1);
`

const withToggle = compose(
  withState('index', 'toggle', 0),
  withHandlers({
    toggle: ({ toggle }) => (e) => toggle(n => n === 2 ? 0 : n + 1)
  })
)

const Slide = css`
  ${tw('absolute pin bg-black bg-center bg-cover bg-no-repeat')};
  will-change: transform, opacity;
`

const Slider = withToggle(({ slides, index, toggle }) => {
  const slidePack = [ 
    style => <animated.div className={`${Slide}`} style={{ ...style, backgroundImage: `url(${slides[0].image.url})` }} />,
    style => <animated.div className={`${Slide}`} style={{ ...style, backgroundImage: `url(${slides[1].image.url})` }} />,
    style => <animated.div className={`${Slide}`} style={{ ...style, backgroundImage: `url(${slides[2].image.url})` }} />,
  ]
  return (
  <div onClick={ toggle }>
    <Transition 
      native 
      from={{ opacity: 0 }} 
      enter={{ opacity: 1 }} 
      leave={{ opacity: 0 }}
    >{ slidePack[index] }</Transition>
  </div>
)})


export default ({ data: { ru: { data } } }) => (
  <Container>
    <Slider slides={data.slider} />
    <TextContainer>
    { data.underconstruction.text }
    </TextContainer>
  </Container>
)

export const query = graphql`
  query IndexRuQuery {
    ru: prismicHomepage(type: {eq: "homepage"}, lang: {eq: "ru"}) {
      data {
        title {
          text
        }
        underconstruction {
          text 
        }
        email {
          url
        }
        slider {
          image {
            url
          }
          caption
        }
      }
    }
  }
`