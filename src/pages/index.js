/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { Transition, animated } from 'react-spring'
import { lifecycle } from 'recompose'

import LogoSvg from '../images/orchestra-logo.svg'

const Container = styled('div')`
  ${tw('flex justify-center absolute pin bg-black items-center w-screen h-screen')};
`

const Logo = styled('div')`
  ${tw('absolute pin-t pin-l bg-right-bottom bg-contain bg-no-repeat')};
  width: calc(200px + 120 * ((100vw - 320px) / 1280));
  height: calc(56px + 34 * ((100vw - 320px) / 1280));
  background-image: url(${LogoSvg});
`

const TextContainer = styled('div')`
  ${tw('text-center relative font-bold text-white z-30 sm:flex-grow')};
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: calc(18px + 36 * ((100vw - 320px) / 1280));
  text-shadow: 0px 0px 24px rgba(0, 0, 0, 1);
`

const withToggle = lifecycle({
  state: { index: 0, mount: false },
  componentDidMount() {
    const intervalId = setInterval(() => {
      this.setState({ index: this.state.index === 6 ? 0 : this.state.index + 1 })
    }, 6000)
    this.setState({ intervalId: intervalId, mount: true })      
  },
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
})

const Slide = css`
  ${tw('absolute pin flex justify-between items-end font-semibold bg-center bg-cover bg-no-repeat')};
  color: transparent;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: calc(12px + 4 * ((100vw - 320px) / 1280));
  font-variant-caps: all-small-caps;
  padding: 1.5rem 2.5rem;
  will-change: opacity;
  @media (min-width: 768px) {
    color: #000000;
  }
`

const Slider = withToggle(({ slides, index, mount }) => {
  const slidePack = slides.map(slide => 
    style => 
      <animated.div className={`${Slide}`} style={{ ...style, backgroundImage: `url(${slide.image.url})` }} >
      { slide.caption }
      </animated.div>
  )
  const CopySlides = [slidePack[0]]
  CopySlides.push(slidePack[index])
  const TransitionGroup = CopySlides.filter((_, i) => i > 0 && i < 2)
  return (
  <div>
  { mount && 
    <Transition 
        native
        keys={TransitionGroup}
        from={{ opacity: 0 }} 
        enter={{ opacity: 1 }} 
        leave={{ opacity: 0 }}
    >{ TransitionGroup }</Transition>
  }
  </div>
)})


export default ({ data: { ru: { data } } }) => (
  <Container>
    <Slider slides={data.slider} />
    <Logo />
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