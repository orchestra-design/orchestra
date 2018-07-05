/* global tw */
import React, { Fragment } from 'react'
import Img from 'gatsby-image'
import { withPrefix } from 'gatsby-link'
import { lifecycle } from 'recompose'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import TemplateWrapper from '../components/layouts'

const withLifecicle = lifecycle({
  state: { lang: 'ru' },
  componentDidMount() {
    const language = window.navigator.userLanguage || window.navigator.language
    const langKey = language.includes('en') ? 'en' : 'ru'
    const redirectUrl = withPrefix(`/${langKey}/`)
    window.___history.replace(redirectUrl)
  }
})

const Index = withLifecicle(({ data: { site } }) => (
  <Fragment>
    <TemplateWrapper {...{site}} lang="ru"></TemplateWrapper>
    <Img 
      resolutions={site.data.siteimage.localFile.childImageSharp.resolutions} 
      className={css`${tw('pin')};`} 
      style={{position: 'absolute'}} 
    />
  </Fragment>
))

export default Index

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