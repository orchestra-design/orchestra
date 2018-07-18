import React, { Fragment } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { connect } from 'react-redux'

import { unless, isNil } from '../../helpers'

import { Footer, Header } from '../blocks'
import { 
  Back, Image,
  ScrollContainer, SEO 
} from '../elements'
import { theme as EmotionTheme } from '../theme'


const TemplateWrapper = ({ 
  seo, allSite, links, color, 
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
                <Footer />
              </div>
            </Fragment>
          </ScrollContainer>
      </Fragment>
    </ThemeProvider>
  )  
}

export default connect(
  ({ storedTheme }) => ({ storedTheme })
)(TemplateWrapper)
