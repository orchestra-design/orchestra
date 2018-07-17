import React from 'react'
import { graphql } from 'gatsby'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'

const WorksTemplate = ({ data: { workspage, seo, allSite, links }}) => {
  const title = path(['data', 'title', 'text'], workspage)
  return (
    <TemplateWrapper
      {...{seo}}
      {...{allSite}}
      {...{links}}
      {...{title}}
    >
      <div theme="white" >{ title }</div>
    </TemplateWrapper>
  )
}

export default WorksTemplate

export const query = graphql`
  query WorksTemplateQuery($lang: String!) {
    workspage: prismicWorks(lang: {eq: $lang}) {
      data {
        title {
          text
        }
      }
    }
    seo: prismicWorks(lang: {eq: $lang}) {
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