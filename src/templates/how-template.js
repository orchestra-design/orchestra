import React from 'react'
import { graphql } from 'gatsby'

import { map, path } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { JumboSlider, Points } from '../components/blocks'

const HowTemplate = ({data: { 
  how, seo, allSite, links, meta
}}) => {
  const data = path(['data'], how)
  const { theme } = data
  const image = map(({ jumboimage }) => ({ image: jumboimage }), path(['jumbo'], data))
  const points = path(['points'], data)
  const title = path(['title', 'text'], data)
  return (
    <TemplateWrapper
      {...{allSite}}
      {...{image}}
      {...{links}}
      hiddenDown={true}
      {...{meta}}
      {...{seo}}
      {...{title}}
    >
      <div        
        {...{theme}}
      ><JumboSlider {...{data}} /></div>
      <div theme="white">
        <Points {...{points}} />
      </div>
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
        theme
        jumbo {
          jumbotitle {
            text
          }
          jumboimage {
            localFile {
              childImageSharp {
                sizes(maxWidth: 1920, quality: 80) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
        points {
          pointsimage {
            localFile {
              childImageSharp {
                sizes(maxWidth: 480, quality: 80) {
                  ...GatsbyImageSharpSizes_noBase64
                }
              }
            }
          }
          pointsheading {
            text
          }
          pointstext {
            html
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