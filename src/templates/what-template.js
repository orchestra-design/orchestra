import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { css } from 'react-emotion'

import TemplateWrapper from '../components/layouts'

const WhatTemplate = ({ data: { what, allSite }}) => {
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
    >
      <div>{what.data.title}</div>
      <div className={css`margin-top: 100px;`} >
      {what.data.headerlinks.map(({link, linktitle}, i) => 
        <Link key={i} to={link.url}>{ linktitle }</Link>
      )}
      </div>
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
        headerlinks {
          linktitle
          link {
            url
          }
        }
        title
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