import React from 'react'
import { graphql } from 'gatsby'

import TemplateWrapper from '../components/layouts'
import { Homepage } from '../components/blocks'

const IndexTemplate = ({ data: { page } }) => (
  <TemplateWrapper 
    seo={{
      data: {
        uid: page.uid,
        seotitle: page.data.seotitle,
        seodescription: page.data.seodescription,
        seokeywords: page.data.seokeywords,
        seoimage: page.data.seoimage,
      }
    }}
    lang={page.lang}
  >
    <Homepage data={page.data} />
  </TemplateWrapper>
)

export default IndexTemplate

export const query = graphql`
  query IndexTemplateQuery($lang: String!) {
    page: prismicHomepage(lang: {eq: $lang}) {
      uid
      lang
      data {
        seotitle
        seodescription
        seokeywords
        seoimage {
          localFile {
            childImageSharp {
              resolutions(width: 1200, height: 630) {
                ...GatsbyImageSharpResolutions_noBase64
              }
            }
          }
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
        }
      }
    }
  }
`