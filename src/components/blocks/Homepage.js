/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { Transition, animated } from 'react-spring'
import { lifecycle } from 'recompose'
import Img from 'gatsby-image'

const Container = styled('div')`
  ${tw('flex flex-col justify-center absolute pin items-center w-screen h-screen')};
  background-color: #000000;
`

const Slide = css`
  ${tw('absolute pin flex justify-start items-end font-semibold')};
  font-family: 'Source Sans Pro', sans-serif;
  font-size: calc(12px + 4 * ((100vw - 320px) / 1280));
  font-variant-caps: all-small-caps;
  padding: 1.5rem 2.5rem;
  will-change: opacity;
`

const withLifecicle = lifecycle({
  state: { index: 0, mount: false },
  componentDidMount() {
    const intervalId = setInterval(() => {
      this.setState({ index: this.state.index === 6 ? 0 : this.state.index + 1 })
    }, 6000)
    this.setState({ intervalId: intervalId }) 
    setTimeout(() =>
      this.setState({ mount: true })      
    , 600)
  },
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
})

const s4 = () => (
  Math.floor((1 + Math.random()) * 0x100000000000)
    .toString(16)
    .substring(1)
)

const Slider = withLifecicle(({ slides, index, mount }) => {
  const slidePack = slides.map(slide => 
    style => 
      <animated.div className={css`${Slide}; }`} style={{...style}} >
        <Img sizes={slide.image.localFile.childImageSharp.sizes} className={css`${tw('absolute pin')};`} style={{position: 'absolute'}} />
        <div className={css`${tw('z-10 invisible md:visible')};`}>{ slide.caption }</div>
      </animated.div>
  )
  const CopySlides = [slidePack[index < 6 ? index + 1 : 0]]
  CopySlides.push(slidePack[index])
  const TransitionGroup = CopySlides
  return (
  <div className={css`opacity: ${mount ? 1 : 0}; transition: all .6s ease-in-out;`} >
    <Transition
      native
      keys={TransitionGroup.map((item, i) => `${item}-${s4()}`)}
      from={{ opacity: .01 }} 
      enter={{ opacity: 1 }} 
      leave={{ opacity: .01 }}
    >{ TransitionGroup }</Transition>
  </div>
)})

export const Homepage = withLifecicle(({ data }) => {
  const { slider } = data
  
  return (
    <Container>
      <Slider slides={slider} />
    </Container>
)})
