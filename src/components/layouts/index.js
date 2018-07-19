import React, { Fragment } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { connect } from 'react-redux'
import { graphql } from  'gatsby'

import { unless, isNil } from '../../helpers'

import { Footer, Header } from '../blocks'
import { 
  Back, ContactButton, Image,
  ScrollContainer, SEO 
} from '../elements'
import { theme as EmotionTheme } from '../theme'

const Contact = ContactButton.withComponent('a')

const TemplateWrapper = ({ 
  seo, allSite, links, meta, color, 
  image, title, children, storedTheme 
}) => {
  const { lang } = seo 
  return (
    <ThemeProvider theme={EmotionTheme[storedTheme]} >
      <Fragment>
        <SEO {...{seo}} />
        <Header 
          {...{allSite}} 
          {...{lang}} 
          {...{links}}
          {...{meta}}
          {...{title}}
        />
        {unless(isNil, () =>
          <Image {...{image}} />
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
        <Contact 
          href={meta.data.email.url}
          target="_blank" rel="noopener noreferrer"
        />
      </Fragment>
    </ThemeProvider>
  )  
}

export default connect(
  ({ storedTheme }) => ({ storedTheme })
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