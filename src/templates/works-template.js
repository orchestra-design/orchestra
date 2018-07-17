import React from 'react'
import { graphql } from 'gatsby'

import { compose, find, map, merge, pick, path, propEq, uuid } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { LinkImage } from '../components/elements'

const WorksTemplate = ({ data: { workspage, allworks, seo, allSite, links }}) => {
  const title = path(['data', 'title', 'text'], workspage)
  const worksLinks = path(['data', 'links'], workspage)
  const allWorksNodes = map(path(['node']))(path(['edges'], allworks))
  const linkUid = path(['link', 'document', 0, 'uid']) 
  const getWorkData = uid => compose(
      pick(['title', 'description', 'color']),
      path(['data']),
      find(propEq('uid', uid))
    )(allWorksNodes)
  
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
        <div style={{width: '420px', height: '315px'}} >
        {worksLinks.map(link => 
          <LinkImage key={uuid()}
            {...merge(link, getWorkData(linkUid(link))) }
          />
        )}
        </div>
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