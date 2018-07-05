import React from 'react'
import { graphql } from 'gatsby'

import { Homepage } from '../components/blocks'
import TemplateWrapper from '../components/layouts'

const IndexRu = ({ data : { prismicHomepage: { data } } }) => (
  <TemplateWrapper lang="ru" >
    <Homepage {...{data}} />
  </TemplateWrapper>
)

export default IndexRu

export const query = graphql`
  query IndexRuQuery {
    prismicHomepage(lang: {eq: "ru"}) {
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