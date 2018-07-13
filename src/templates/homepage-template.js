import React from 'react'
import { graphql } from 'gatsby'

import TemplateWrapper from '../components/layouts'
//import { Homepage } from '../components/blocks'

const IndexTemplate = ({ data: { page, allSite, links } }) => (
  <TemplateWrapper 
    seo={{
      data: {
        uid: null,
        seotitle: page.data.seotitle,
        seodescription: page.data.seodescription,
        seokeywords: page.data.seokeywords,
        seoimage: page.data.seoimage,
      }
    }}
    color='white'
    image={page.data.slider[0].image}
    title={page.data.seotitle}
    lang={page.lang}
    {...{allSite}}
    {...{links}}
  >
    {/* <Homepage data={page.data} /> */}
    <div  theme="image" >{ page.data.seotitle }</div>
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
    links: prismicHomepage(lang: {eq: $lang}) {
      data {
        headerlinks {
          linktitle
          link {
            url
          }
        }
      }
    }
    allSite: allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`