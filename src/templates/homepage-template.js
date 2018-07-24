import React from 'react'
import { graphql } from 'gatsby'

import { safeMap, path, uuid  } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { TickSlider, WorksFilters, WorksGrid } from '../components/blocks'
import { Columns, Lead } from '../components/elements'

const IndexTemplate = ({data: { 
  page, allworks, works, seo, allSite, links, meta
}}) => {
  const body = path(['data', 'body'], page)
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
      {safeMap(section => (
        section.__typename === 'PrismicHomepageBodyLead' 
        ? <div key={uuid()} theme={section.primary.leadtheme} style={{position: 'relative'}} >
            <Lead text={section.primary.leadtext.text} />
          </div>
        : section.__typename === 'PrismicHomepageBodyColumns'
        ? <div key={uuid()} theme={section.primary.coltheme} style={{position: 'relative'}} >
            <Columns 
              items={section.items}
              primary={section.primary}
            />
          </div>
        : null
      ))(body)}
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
                  ...GatsbyImageSharpSizes
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
        body {
          __typename
          ... on PrismicHomepageBodyLead {
            primary {
              leadtheme
              leadtext {
                text
              }
            }
          }
          ... on PrismicHomepageBodyColumns {
            primary {
              coltheme
              colbackimage {
                localFile {
                  childImageSharp {
                    sizes(maxWidth: 1920, quality: 80) {
                      ...GatsbyImageSharpSizes_noBase64
                    }
                  }
                }
              }
            }
            items {
              colimage {
                localFile {
                  childImageSharp {
                    sizes(maxWidth: 480, quality: 80) {
                      ...GatsbyImageSharpSizes_noBase64
                    }
                  }
                }
              }
              coltext {
                html
              }
            }
          }
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