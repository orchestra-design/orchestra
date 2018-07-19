import React from 'react'
import { graphql } from 'gatsby'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'

const WhatTemplate = ({data: {
  what, seo, allSite, links, meta
}}) => {
  const title = path(['data', 'title'], what)
  return (
    <TemplateWrapper
      {...{allSite}}
      {...{links}}
      {...{meta}}
      {...{seo}}
      {...{title}}
    >
      <div theme="white" >{what.data.title}</div>
    </TemplateWrapper>
  )
}

export default WhatTemplate

export const query = graphql`
  query WhatTemplateQuery($lang: String!) {
    what: prismicWhat(lang: {eq: $lang}) {
      data {
        title
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