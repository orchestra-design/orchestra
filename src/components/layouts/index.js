/* global tw */
import React, { Fragment } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { css, injectGlobal } from 'emotion'

import { connect } from 'react-redux'
import { graphql } from  'gatsby'

import { Footer, Header } from '../blocks'

import { 
  Back, ContactButton, DownButton, Image, Main,
  ScrollContainer, RightImage, SEO, UpButton
} from '../elements'

import { unless, isNil } from '../../helpers'

import { theme as EmotionTheme } from '../theme'
import styled from '../../../node_modules/react-emotion';

injectGlobal`
  body {
    ${tw(['fixed', 'overflow-hidden', 'pin', 'm-0'])};
  }
`

const Contact = ContactButton.withComponent('a')

const ImageWrapper = styled('div')`
  ${tw(['hidden'])};
  ${({ appear }) => appear && tw(['block'])};
  ${tw(['screen:block'])};
`

const TemplateWrapper = ({ 
  seo, allSite, hiddenDown, links, meta, color, backSlider, hasBackImage,
  image, rightImage, sicgrid, title, children, storedTheme 
}) => {
  const { lang } = seo
  
  return (
    <ThemeProvider theme={EmotionTheme[storedTheme]} >
      <Main>
        <SEO {...{seo}} />
        <Header 
          {...{allSite}} 
          {...{lang}} 
          {...{links}}
          {...{meta}}
          {...{title}}
        />
        {unless(isNil, () =>
          <ImageWrapper appear={backSlider || hasBackImage}
          ><Image {...{image}} /></ImageWrapper>
        )(image)}
        <Back {...{color}} />
        {unless(isNil, () =>
          <div
            className={css`${tw('absolute md:block hidden pin')};`}
          ><RightImage {...{rightImage}} {...{sicgrid}} /></div>
        )(rightImage)}
        <ScrollContainer>
          <Fragment>
            { children }            
            <div theme="black">
              <Footer {...{meta}} />
            </div>
          </Fragment>
        </ScrollContainer>
        <DownButton {...{hiddenDown}}/>
        <UpButton />
        <Contact 
          href={meta.data.email.url}
          target="_blank" rel="noopener noreferrer"
        />
      </Main>
    </ThemeProvider>
  )  
}

export default connect(
  ({
     backSlider, hasBackImage, rightImage, sicgrid, storedTheme 
  }) => ({
     backSlider, hasBackImage, rightImage, sicgrid, storedTheme 
  })
)(TemplateWrapper)


export const query = graphql`
  fragment MetaFragment on PrismicMeta {
    data {
      title
      description {
        html
        text
      }
      addresses {
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
    }
  }
`