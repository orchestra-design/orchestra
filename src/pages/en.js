import React from 'react'
import { graphql } from 'gatsby'

import { Homepage } from '../components/blocks'
import TemplateWrapper from '../components/layouts'

const IndexEn = ({ data : { prismicHomepage: { data } } }) => (
  <TemplateWrapper lang="en" >
    <Homepage {...{data}} />
  </TemplateWrapper>
)

export default IndexEn

export const query = graphql`
  query IndexEnQuery {
    prismicHomepage(lang: {eq: "en-us"}) {
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
  }
`