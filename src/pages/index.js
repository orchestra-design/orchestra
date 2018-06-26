/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { Transition, animated } from 'react-spring'
import { lifecycle, compose, withState, withHandlers } from 'recompose'

import LogoSvg from '../images/orchestra-logo.svg'

const Container = styled('div')`
  ${tw('flex flex-col justify-center absolute pin bg-black items-center w-screen h-screen')};
`

const Logo = styled('div')`
  ${tw('absolute pin-t pin-l bg-right-bottom bg-contain bg-no-repeat')};
  width: calc(200px + 90 * ((100vw - 320px) / 1280));
  height: calc(56px + 34 * ((100vw - 320px) / 1280));
  background-image: url(${LogoSvg});
`

const TextContainer = styled('div')`
  ${tw('text-center relative font-bold text-white z-20')};
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: calc(18px + 36 * ((100vw - 320px) / 1280));
  text-shadow: 0px 0px 24px rgba(0, 0, 0, 1);
`

const Button = css`
  ${tw('absolute flex justify-center align-center m-6 cursor-pointer no-underline text-white hover:text-black bg-black hover:bg-white shadow-none hover:shadow-md z-50')};
  font-family: 'Source Sans Pro', sans-serif;
  font-size: calc(12px + 4 * ((100vw - 320px) / 1280));
  font-variant-caps: all-small-caps;
  transition: all .2s ease-in-out;
  white-space: nowrap;
`

const LangSwitcher = styled('span')`
  ${tw('pin-r pin-t')}
  ${Button};
  padding: 1rem;
`

const Email = styled('a')`
  ${tw('pin-r pin-b')}
  ${Button};
  padding: 1rem 1.5rem;
`

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

const withLifecicle = lifecycle({
  state: { index: 0, mount: false },
  componentDidMount() {
    const intervalId = setInterval(() => {
      this.setState({ index: this.state.index === 6 ? 0 : this.state.index + 1 })
    }, 6000)
    this.setState({ intervalId: intervalId }) 
    setTimeout(() =>
      this.setState({ mount: true })      
    , 1200)
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
      <animated.div className={`${Slide}`} style={{ ...style, backgroundImage: `url(${slide.image.url})` }} >
      { slide.caption }
      </animated.div>
  )
  const CopySlides = [slidePack[1]]
  CopySlides.push(slidePack[index < 6 ? index + 1 : 0])
  CopySlides.push(slidePack[index])
  const TransitionGroup = CopySlides.filter((_, i) => i > 0 && i < 3)
  return (
  <div className={css`opacity: ${mount ? 1 : 0}; transition: all .6s ease-in-out;`} >
    <Transition 
        native
        keys={TransitionGroup.map((item, i) => `${item}-${s4()}`)}
        from={{ opacity: 0 }} 
        enter={{ opacity: 1 }} 
        leave={{ opacity: 0 }}
    >{ TransitionGroup }</Transition>
  </div>
)})

const withToggle = compose(
  withState('en', 'toggle', false),
  withHandlers({
    toggle: ({ toggle }) => (e) => toggle((current) => !current)
  })
)

const Index = withToggle(({ data, en, toggle }) => {
  const chosenLang = en ? data.en.data : data.ru.data
  return (
    <Container>
      <Slider slides={chosenLang.slider} />
      <Logo />
      <LangSwitcher onClick={ toggle } >en</LangSwitcher>
      <TextContainer>
      { chosenLang.underconstruction.text }
      </TextContainer>
      <Email href={chosenLang.email.url} >
      { chosenLang.email.url.replace('mailto:', '') }
      </Email>
    </Container>
)})

export default Index

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
    en: prismicHomepage(type: {eq: "homepage"}, lang: {eq: "en-us"}) {
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