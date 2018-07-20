import React from 'react'
import { graphql } from 'gatsby'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { ImageStatement } from '../components/blocks'

const WhatTemplate = ({data: {
  what, seo, allSite, links, meta
}}) => {
  const data = path(['data'], what)
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
        theme="image-inverse"
        image={JSON.stringify(image)}
      >
        <ImageStatement {...{data}} />
      </div>
    </TemplateWrapper>
  )
}

export default WhatTemplate

export const query = graphql`
  query WhatTemplateQuery($lang: String!, $color: String!) {
    what: prismicWhat(lang: {eq: $lang}) {
      data {
        title
        statement {
          text
        }
        description
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
    seo: prismicWhat(lang: {eq: $lang}) {
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
    links: prismicWhat(lang: {eq: $lang}) {
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