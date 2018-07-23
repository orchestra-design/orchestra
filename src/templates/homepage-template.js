import React from 'react'
import { graphql } from 'gatsby'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { WorksFilters, WorksGrid } from '../components/blocks'
import { TickSlider } from '../components/elements'

const IndexTemplate = ({data: { 
  page, allworks, works, seo, allSite, links, meta
}}) => {
  const image = path(['data', 'slider'], page)
  const worksLinks = path(['data', 'links'], works)
  return (
    <TemplateWrapper 
      {...{allSite}}
      color='white'
      {...{image}}
      {...{links}}
      {...{meta}}
      {...{seo}}
      title={seo.data.seotitle}
    >
      <div theme="image" >
        <TickSlider {...{image}} />
      </div>
      <div theme="white" style={{height: '100vh'}} ></div>
      <div theme="white" >
        <WorksFilters {...{allworks}} />
        <WorksGrid {...{allworks}} {...{worksLinks}} />
      </div>
      <div theme="image" style={{height: '100vh'}} >{ page.data.seotitle }</div>
    </TemplateWrapper>
  )
}

export default IndexTemplate

export const query = graphql`
  query IndexTemplateQuery($lang: String!) {
    page: prismicHomepage(lang: {eq: $lang}) {
      data {
        slider {
          image {
            localFile {
              childImageSharp {
                sizes(maxWidth: 1920, quality: 80) {
                  ...GatsbyImageSharpSizes_noBase64
                }
              }
            }
          }
          worktitle {
            text
          }
          caption
          theme
        }
      }
    }
    allworks: allPrismicWork(filter: {lang: {eq: $lang}}) {
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
    works: prismicWorks(lang: {eq: $lang}) {
      data {        
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
    seo: prismicHomepage(lang: {eq: $lang}) {
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
    links: prismicHomepage(lang: {eq: $lang}) {
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