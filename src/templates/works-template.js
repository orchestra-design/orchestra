import React from 'react'
import { graphql } from 'gatsby'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'

const WorksTemplate = ({ data: { works, allSite, links }}) => {
  const title = path(['data', 'title', 'text'], works)
  return (
    <TemplateWrapper
     seo={{
        data: {
          uid: works.uid,
          seotitle: works.data.seotitle,
          seodescription: works.data.seodescription,
          seokeywords: works.data.seokeywords,
          seoimage: works.data.seoimage,
        }
      }}
      lang={works.lang}
      {...{allSite}}
      {...{links}}
      {...{title}}
    >
      <div theme="white" >{works.data.title.text}</div>
    </TemplateWrapper>
  )
}

export default WorksTemplate

export const query = graphql`
  query WorksTemplateQuery($lang: String!) {
    works: prismicWorks(lang: {eq: $lang}) {
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
        title {
          text
        }
      }
    }
    links: prismicWorks(lang: {eq: $lang}) {
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