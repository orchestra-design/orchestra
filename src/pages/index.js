/* global tw */
import React, { Fragment } from 'react'
import Img from 'gatsby-image'
import { withPrefix } from 'gatsby-link'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import TemplateWrapper from '../components/layouts'

class RedirectIndex extends React.PureComponent {
  constructor(args) {
    super(args)

    // Skip build, Browsers only
    if (typeof window !== 'undefined') {
      const language = window.navigator.userLanguage || window.navigator.language
      const langKey = language.includes('en') ? 'en' : 'ru'
      const redirectUrl = withPrefix(`/${langKey}/`)
      window.___history.replace(redirectUrl)
    }
  }
  render() {
    return (
      <Fragment>
        <TemplateWrapper site={this.props.data.site} lang="ru"></TemplateWrapper>
        <Img 
          resolutions={this.props.data.site.data.siteimage.localFile.childImageSharp.resolutions} 
          className={css`${tw('pin')};`} 
          style={{position: 'absolute'}} 
        />
      </Fragment>
    )
  }
}

export default RedirectIndex

export const query = graphql`
  query IndexQuery {
    site: prismicSite(lang: {eq: "ru"}) {
      data {
        siteurl
        sitetitle
        sitedescription
        sitekeywords
        siteimage {
          localFile {
            childImageSharp {
              resolutions(width: 1200, height: 630) {
                ...GatsbyImageSharpResolutions_noBase64
              }
            }
          }
        }
      }
    }
  }
`