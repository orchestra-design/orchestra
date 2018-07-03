/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { Transition, animated } from 'react-spring'
import { lifecycle, compose, withState, withHandlers } from 'recompose'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import favicon from '../images/favicon.png'
import LogoSvg from '../images/orchestra-logo.svg'
import LogoBlackSvg from '../images/orchestra-logo-black.svg'

const Container = styled('div')`
  ${tw('flex flex-col justify-center absolute pin items-center w-screen h-screen')};
  background-color: #000000;
`

const Logo = styled('div')`
  ${tw('absolute pin-t pin-l bg-right-bottom bg-contain bg-no-repeat')};
  width: calc(220px + 90 * ((100vw - 320px) / 1280));
  height: calc(72px + 24 * ((100vw - 320px) / 1280));
  margin: 5px;
  min-height: 84px;
  min-width: 260px;
  background-image: url(${({primaryColor}) => primaryColor === '#ffffff' ? LogoSvg : LogoBlackSvg});
`

const dynamicText = ({primaryColor}) =>
  css`
    color: ${primaryColor};    
    text-shadow: ${primaryColor === '#ffffff' && '0px 0px 24px rgba(0, 0, 0, 1)'};
  `

const TextContainer = styled('div')`
  ${dynamicText};
  ${tw('text-center relative font-bold z-20')};
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: calc(21px + 15 * ((100vw - 320px) / 1280));
  padding: 0 2rem;
  transition: color .4s ease-in-out .1s;
`

const Button = css`
  ${tw('absolute flex justify-center align-center m-6 cursor-pointer no-underline text-white hover:text-black hover:bg-white shadow-none hover:shadow-md z-50')};
  background-color: #000000;
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

const Slider = withLifecicle(({ slides, secondColor, index, mount }) => {
  const slidePack = slides.map(slide => 
    style => 
      <animated.div className={css`${Slide}; }`} style={{...style}} >
        <Img sizes={slide.image.localFile.childImageSharp.sizes} className={css`${tw('absolute pin')};`} style={{position: 'absolute'}} />
        <div className={css`${tw('z-10 invisible md:visible')}; color: ${secondColor};`}>{ slide.caption }</div>
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

const withToggle = compose(
  withState('ru', 'toggle', true),
  withHandlers({
    toggle: ({ toggle }) => (e) => toggle((current) => !current)
  }),
  lifecycle({
    state: { isEn: false },
    componentDidMount() {
      const language = window.navigator.userLanguage || window.navigator.language
      language.includes('en') ? this.setState({ isEn: true }) : this.setState({ isEn: false })
    }
  }),
  withLifecicle
)

const Index = withToggle(({ data, index, isEn, ru, toggle }) => {
  let chosenLang
  let switcherLang
  if(isEn) {
    if(ru) {
      chosenLang = data.en.data
      switcherLang = 'ru'
    } else {
      chosenLang = data.ru.data
      switcherLang = 'en'
    }
  } else {
    if(ru) {
      chosenLang = data.ru.data
      switcherLang = 'en'
    } else {
      chosenLang = data.en.data
      switcherLang = 'ru'
    }
  }
  const primaryColor = chosenLang.slider[index].startcolor ? chosenLang.slider[index].startcolor : '#ffffff'
  const secondColor = chosenLang.slider[index].startcolor ? chosenLang.slider[index].endcolor : '#000000'
  
  return (
    <Container>
      <Helmet
        title={chosenLang.title.text}
        meta={[
          { name: 'description', content: chosenLang.title.text },
          { name: 'keywords', content: chosenLang.title.text },
        ]}
      >
        <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
        {data.ru.data.slider.map(({image}) => 
          <link key={s4()} rel="preload" href={image.url} as="image" crossorigin="anonymous"/>
        )}
      </Helmet>
      <Slider slides={chosenLang.slider} {...{secondColor}} />
      <Logo {...{primaryColor}} />
      <LangSwitcher onClick={ toggle } >{ switcherLang }</LangSwitcher>
      <TextContainer {...{primaryColor}} >
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
            localFile {
              childImageSharp {
                sizes(maxWidth: 1920) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
          caption
          startcolor
          endcolor
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
            localFile {
              childImageSharp {
                sizes(maxWidth: 1920) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
          caption
          startcolor
          endcolor
        }
      }
    }
  }
`