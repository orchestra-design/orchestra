import React from 'react'
import { graphql } from 'gatsby'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { ImageStatement } from '../components/blocks'

const WhoTemplate = ({data: { 
  who, seo, allSite, links, meta
}}) => {
  const data = path(['data'], who)
  const image = path(['image'], data)
  const title = path(['title'], data)
  return (
    <TemplateWrapper
      {...{allSite}}
      {...{links}}
      {...{meta}}
      {...{seo}}
      {...{title}}
    >
      <div        
        theme="image"
        image={JSON.stringify(image)}
      >
        <ImageStatement {...{data}} />
      </div>
    </TemplateWrapper>
  )
}

export default WhoTemplate

export const query = graphql`
  query WhoTemplateQuery($lang: String!, $color: String!) {
    who: prismicWho(lang: {eq: $lang}) {
      data {        
        title
        statement {
          text
        }
        image {
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
    seo: prismicWho(lang: {eq: $lang}) {
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
    links: prismicWho(lang: {eq: $lang}) {
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