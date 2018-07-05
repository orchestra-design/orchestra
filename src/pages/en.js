import React from 'react'
import { graphql } from 'gatsby'

import { Homepage } from '../components/blocks'
import TemplateWrapper from '../components/layouts'

const IndexEn = ({ data: { page: { data }, site } }) => (
  <TemplateWrapper {...{site}} lang="en" >
    <Homepage {...{data}} />
  </TemplateWrapper>
)

export default IndexEn

export const query = graphql`
  query IndexEnQuery {
    page: prismicHomepage(lang: {eq: "en-us"}) {
      data {
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
    site: prismicSite(lang: {eq: "en-us"}) {
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