import React from 'react'
import { graphql } from 'gatsby'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'

const HowTemplate = ({data: { 
  how, seo, allSite, links, meta
}}) => {
  const title = path(['data', 'title', 'text'], how)
  return (
    <TemplateWrapper
      {...{allSite}}
      {...{links}}
      {...{meta}}
      {...{seo}}
      {...{title}}
    >
      <div >{how.data.title.text}</div>
    </TemplateWrapper>
  )
}

export default HowTemplate

export const query = graphql`
  query HowTemplateQuery($lang: String!) {
    how: prismicHow(lang: {eq: $lang}) {
      data {
        title {
          text
        }
        jumbo {
          jumboimage {
            localFile {
              childImageSharp {
                sizes(maxWidth: 1920) {
                  ...GatsbyImageSharpSizes_tracedSVG
                }
              }
            }
          }
        }    
      }
    }
    seo: prismicHow(lang: {eq: $lang}) {
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
      }
    }
    links: prismicHow(lang: {eq: $lang}) {
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
    meta: prismicMeta(lang: {eq: $lang}) {
      ...MetaFragment
    }
  }
`