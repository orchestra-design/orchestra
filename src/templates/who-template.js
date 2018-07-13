import React from 'react'
import { graphql } from 'gatsby'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'

const WhoTemplate = ({ data: { who, allSite, links }}) => {
  const title = path(['data', 'title'], who)
  return (
    <TemplateWrapper
     seo={{
        data: {
          uid: who.uid,
          seotitle: who.data.seotitle,
          seodescription: who.data.seodescription,
          seokeywords: who.data.seokeywords,
          seoimage: who.data.seoimage,
        }
      }}
      lang={who.lang}
      {...{allSite}}
      {...{links}}
      {...{title}}
    >
      <div theme="white" >{who.data.title}</div>
    </TemplateWrapper>
  )
}

export default WhoTemplate

export const query = graphql`
  query WhoTemplateQuery($lang: String!) {
    who: prismicWho(lang: {eq: $lang}) {
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
  }
`