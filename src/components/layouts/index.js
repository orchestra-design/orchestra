import React, { Fragment } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { connect } from 'react-redux'

import { Header } from '../blocks'
import { SEO } from '../elements'
import { theme as EmotionTheme } from '../theme'

const TemplateWrapper = ({ site: { data }, lang, children, storedTheme }) => {
  return (
    <ThemeProvider theme={EmotionTheme[storedTheme]} >
      <Fragment>
        <SEO
          siteUrl={data.siteurl}
          uid={data.uid || null}
          title={data.sitetitle}
          description={data.sitedescription}
          keywords={data.sitekeywords}
          image={data.siteimage.localFile.childImageSharp.resolutions.src}
          fbAppID=''
        />
        <Header {...{lang}} />
        { children }
      </Fragment>
    </ThemeProvider>
  )  
}

export default connect(
  ({ storedTheme }) => ({ storedTheme })
)(TemplateWrapper)
