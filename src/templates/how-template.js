import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { JumboSlider } from '../components/blocks'

const HowTemplate = ({data: { 
  how, seo, allSite, links, meta
}}) => {
  const data = path(['data'], how)
  const { theme } = data
  const title = path(['title', 'text'], data)
  const image = path(['jumbo', 0, 'jumboimage'], data)
  return (
    <TemplateWrapper
      {...{allSite}}
      {...{links}}
      {...{meta}}
      {...{seo}}
      {...{title}}
    >
      <div        
        {...{theme}}
        image={JSON.stringify(image)}
      ><JumboSlider {...{data}} /></div>
      <div className={css`height: 100vh;`} theme="white" />
    </TemplateWrapper>
  )
}

export default HowTemplate

export const query = graphql`
  query HowTemplateQuery($lang: String!, $color: String!) {
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
                sizes(maxWidth: 1920, quality: 80, traceSVG: {
                  color: $color
                  turnPolicy: TURNPOLICY_MINORITY
                  blackOnWhite: false
                }) {
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