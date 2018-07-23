import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import { map, path } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { JumboSlider } from '../components/blocks'

const HowTemplate = ({data: { 
  how, seo, allSite, links, meta
}}) => {
  const data = path(['data'], how)
  const { theme } = data
  const title = path(['title', 'text'], data)
  const image = map(({ jumboimage }) => ({ image: jumboimage }), path(['jumbo'], data))
  return (
    <TemplateWrapper
      {...{allSite}}
      {...{image}}
      {...{links}}
      {...{meta}}
      {...{seo}}
      {...{title}}
    >
      <div        
        {...{theme}}
      ><JumboSlider {...{data}} /></div>
      <div className={css`height: 100vh;`} theme="white" />
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
                  ...GatsbyImageSharpSizes_noBase64
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