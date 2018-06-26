/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { Transition, animated } from 'react-spring'
import { lifecycle } from 'recompose'

const Container = styled('div')`
  ${tw('flex justify-center absolute pin bg-black items-center w-screen h-screen')};
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
    }, 4000)
    this.setState({ intervalId: intervalId, mount: true })      
  },
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
})

const Slide = css`
  ${tw('absolute pin bg-center bg-cover bg-no-repeat')};
  will-change: transform, opacity;
`

const Slider = withToggle(({ slides, index, mount }) => {
  const slidePack = slides.map(slide => 
    style => <animated.div className={`${Slide}`} style={{ ...style, backgroundImage: `url(${slide.image.url})` }} />  
  )
  return (
  <div>
   {mount && <Transition 
      native 
      from={{ opacity: 0 }} 
      enter={{ opacity: 1 }} 
      leave={{ opacity: 0 }}
    >{ slidePack[index] }</Transition>
   }
   
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