import React from 'react'
import { graphql } from 'gatsby'

import TemplateWrapper from '../components/layouts'
import { Homepage } from '../components/blocks'

const IndexRu = ({ data: { page: { data }, site } }) => (
  <TemplateWrapper {...{site}} lang="ru" >
    <Homepage {...{data}} />
  </TemplateWrapper>
)

export default IndexRu

export const query = graphql`
  query IndexRuQuery {
    page: prismicHomepage(lang: {eq: "ru"}) {
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