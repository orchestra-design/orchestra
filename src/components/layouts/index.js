/* global tw */
import React, { Fragment } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { css, injectGlobal } from 'emotion'

import { connect } from 'react-redux'
import { graphql } from  'gatsby'

import { Footer, Header } from '../blocks'

import { 
  Back, ContactButton, Image, Main,
  ScrollContainer, SEO, UpButton
} from '../elements'

import { unless, isNil } from '../../helpers'

import { theme as EmotionTheme } from '../theme'

injectGlobal`
  body {
    ${tw(['fixed', 'overflow-hidden', 'pin', 'm-0'])};
  }
`

const Contact = ContactButton.withComponent('a')

const TemplateWrapper = ({ 
  seo, allSite, links, meta, color, 
  backImage, title, children, storedTheme 
}) => {
  const { lang } = seo
  const image = JSON.parse(backImage)
  console.log(storedTheme);
  
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
          <div
            className={css`${tw('hidden screen:block')};`}
          ><Image {...{image}} /></div>
        )(image)}
        <Back {...{color}} />
        <ScrollContainer>
          <Fragment>
            { children }            
            <div theme="black">
              <Footer {...{meta}} />
            </div>
          </Fragment>
        </ScrollContainer>
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
  ({ backImage, storedTheme }) => ({ backImage, storedTheme })
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