import React from 'react'
import { graphql } from 'gatsby'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { WorksGrid, WorksFilters } from '../components/blocks'

const WorksTemplate = ({ data: { workspage, allworks, seo, allSite, links }}) => {
  const title = path(['data', 'title', 'text'], workspage)
  const worksLinks = path(['data', 'links'], workspage)

  return (
    <TemplateWrapper
      {...{seo}}
      {...{allSite}}
      {...{links}}
      {...{title}}
    >
      <div theme="white" >
        <h1>
        { title }
        </h1>        
        <WorksFilters {...{allworks}} />
        <WorksGrid {...{allworks}} {...{worksLinks}} />
      </div>
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
        links {
          image {
            localFile {
              childImageSharp {
                sizes(maxWidth: 768) {
                  ...GatsbyImageSharpSizes_noBase64
                }
              }
            }
          }
          hoverimage {
            localFile {
              childImageSharp {
                sizes(maxWidth: 768) {
                  ...GatsbyImageSharpSizes_noBase64
                }
              }
            }
          }
          link {
            url
            document {
              uid
            }
          }
        }
      }
    }
    allworks: allPrismicWork(filter: {lang: {eq: "ru"}}) {
      edges {
        node {
          uid
          tags
          data {
            location
            type
            status
            timeline
            client
            title {
              text
            }
            description
            color
          }
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