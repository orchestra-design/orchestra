import React, { Fragment } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { connect } from 'react-redux'

import { Header } from '../blocks'
import { SEO } from '../elements'
import { theme as EmotionTheme } from '../theme'

const TemplateWrapper = ({ seo, lang, allSite, links, children, storedTheme }) => {
  return (
    <ThemeProvider theme={EmotionTheme[storedTheme]} >
      <Fragment>
        <SEO {...{seo}} />
        <Header {...{lang}} {...{allSite}} {...{links}} />
        { children }
      </Fragment>
    </ThemeProvider>
  )  
}

export default connect(
  ({ storedTheme }) => ({ storedTheme })
)(TemplateWrapper)
