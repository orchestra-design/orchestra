import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import { equals, safeMap, path, uuid  } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { 
  Columns, Image, ImageCaption, 
  ImageStatement, Lead 
} from '../components/blocks'

const WhoTemplate = ({data: { 
  who, seo, allSite, links, meta
}}) => {
  const body = path(['data', 'body'], who)
  const data = path(['data'], who)
  const { image, theme, title } = data
  return (
    <TemplateWrapper
      {...{allSite}}
      {...{links}}
      {...{image}}
      {...{meta}}
      {...{seo}}
      {...{title}}
    >
      <div        
        {...{theme}}
      >
        <ImageStatement {...{data}} />
      </div>
      {safeMap(section => (
        <Fragment key={uuid()} >
        {equals('PrismicWhoBodyColumns', section.__typename) &&
          <div key={uuid()} theme={section.primary.coltheme} style={{position: 'relative'}} >
            <Columns key={uuid()}
              items={section.items}
              primary={section.primary}
            />
          </div>
        }
        {equals('PrismicWhoBodyLead', section.__typename) &&
          <div key={uuid()} 
            image={JSON.stringify(section.primary.leadimage)} 
            style={{position: 'relative'}}
            theme={section.primary.leadtheme} 
          >
            <Lead key={uuid()} 
              primary={section.primary} 
            />
          </div>
        }
        {equals('PrismicWhoBodyImage', section.__typename) &&
          <div key={uuid()} theme={section.primary.imgtheme} style={{position: 'relative'}} >
            <Image key={uuid()}
              items={section.items}
            />
          </div>
        }
        {equals('PrismicWhoBodyImageCaption', section.__typename) &&
          <div key={uuid()} theme={section.primary.sictheme} style={{position: 'relative'}} >
            <ImageCaption key={uuid()}
              items={section.items}
              primary={section.primary}
            />
          </div>
        }
        </Fragment>
      ))(body)}
    </TemplateWrapper>
  )
}

export default WhoTemplate

export const query = graphql`
  query WhoTemplateQuery($lang: String!) {
    who: prismicWho(lang: {eq: $lang}) {
      data {        
        title
        statement {
          text
        }
        theme
        image {
          localFile {
            childImageSharp {
              sizes(maxWidth: 1920, quality: 80) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
        body {
          __typename
          ... on PrismicWhoBodyColumns {
            primary {
              coltheme              
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
          ... on PrismicWhoBodyLead {
            primary {
              leadtheme
              leadimage {
                localFile {
                  childImageSharp {
                    sizes(maxWidth: 1920, quality: 80) {
                      ...GatsbyImageSharpSizes
                    }
                  }
                }
              }
              leadtext {
                text
              }
            }
          }
          ... on PrismicWhoBodyImage {
            primary {
              imgtheme
            }
            items {          
              imgimage {
                localFile {
                  childImageSharp {
                    sizes(maxWidth: 1920, quality: 80) {
                      ...GatsbyImageSharpSizes
                    }
                  }
                }
              }
            }
          }
          ... on PrismicWhoBodyImageCaption {
            primary {
              sicgrid
              sictheme
              sicheader {
                html
              }
              sicimage {
                localFile {
                  childImageSharp {
                    sizes(maxWidth: 1920, quality: 80) {
                      ...GatsbyImageSharpSizes
                    }
                  }
                }
              }
            }
            items {
              sictext {
                html
              }
            }
          }
        }
      }
    }
    seo: prismicWho(lang: {eq: $lang}) {
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
    meta: prismicMeta(lang: {eq: $lang}) {
      ...MetaFragment
    }
  }
`