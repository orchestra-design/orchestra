/* global tw */
import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { css, injectGlobal } from 'emotion'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { graphql } from 'gatsby'

import { toggleContact } from '../../actions'

import { Header } from '../blocks'

import {
  Back,
  DownButton,
  Image,
  Main,
  ScrollContainer,
  RightImage,
  SEO,
  UpButton,
} from '../elements'

import { unless, isNil, pick } from '../../helpers'

import { theme as EmotionTheme } from '../theme'
import '../../fonts/open-sans/stylesheet.css'
import '../../fonts/plex/stylesheet.css'

injectGlobal`
  body {
    ${tw(['relative', 'm-0'])};
  }
`


const ImageWrapper = styled('div')`
  ${tw(['hidden', 'fixed', 'pin'])};
  ${({ appear }) => appear && tw(['block'])};
  ${tw(['screen:block'])};
`

const TemplateWrapper = ({
  allSite,
  backSlider,
  children,
  color,
  hasBackImage,
  notDown,
  image,
  location,
  meta,
  rightImage,
  seo,
  sicgrid,
  storedTheme,
  title,
}) => {
  const { lang } = seo

  async function loadPolyfills() {
    if (window !== undefined && typeof window.IntersectionObserver === 'undefined') {
      await import('intersection-observer')
    }
  }

  React.useEffect(() => {
    loadPolyfills();
  }, [])

  return (
    <ThemeProvider theme={EmotionTheme[storedTheme]}>
      <Main>
        <SEO {...{ seo }} />
        <Header
          {...{ allSite }}
          {...{ color }}
          {...{ lang }}
          {...{ location }}
          {...{ meta }}
          {...{ title }}
        />
        {unless(isNil, () => (
          <ImageWrapper appear={backSlider || hasBackImage}>
            <Image {...{ image }} />
          </ImageWrapper>
        ))(image)}
        <Back {...{ color }} />
        {unless(isNil, () => (
          <div
            className={css`
              ${tw('absolute md:block hidden pin')};
            `}
          >
            <RightImage {...{ rightImage }} {...{ sicgrid }} />
          </div>
        ))(rightImage)}
        <ScrollContainer>{children}</ScrollContainer>
        <DownButton {...{ notDown }} />
        <UpButton />
      </Main>
    </ThemeProvider>
  )
}

export default connect(
  pick([
    'backSlider',
    'contactForm',
    'hasBackImage',
    'rightImage',
    'sicgrid',
    'storedTheme',
  ]),
  { toggleContact }
)(TemplateWrapper)

export const query = graphql`
  fragment MetaFragment on PrismicMeta {
    data {
      title
      description {
        html
        text
      }
      addressesru {
        html
        text
      }
      addressesfr {
        html
        text
      }
      email {
        url
      }
      links {
        linktype
        link {
          url
        }
      }
      development
      acciolink {
        url
      }
      headerlinks {
        linktitle
        link {
          url
        }
      }
      query {
        inputtype
        question {
          html
        }
      }
    }
  }
`
