import React from 'react'
import { graphql } from 'gatsby'

import TemplateWrapper from '../components/layouts'

const WhatTemplate = ({ data: { what, allSite, links }}) => {
  return (
    <TemplateWrapper
     seo={{
        data: {
          uid: what.uid,
          seotitle: what.data.seotitle,
          seodescription: what.data.seodescription,
          seokeywords: what.data.seokeywords,
          seoimage: what.data.seoimage,
        }
      }}
      lang={what.lang}
      {...{allSite}}
      {...{links}}
    >
      <div>{what.data.title}</div>
    </TemplateWrapper>
  )
}

export default WhatTemplate

export const query = graphql`
  query WhatTemplateQuery($lang: String!) {
    what: prismicWhat(lang: {eq: $lang}) {
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
        title
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
  }
`