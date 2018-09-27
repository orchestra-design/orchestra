import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import { includes, path, pick, uuid } from '../helpers'
import TemplateWrapper from '../components/layouts'
import {
  Columns,
  Footer,
  ImageSlider,
  ImageCaption,
  ImageStatement,
  Lead,
} from '../components/blocks'
import { ScrollChild } from '../components/elements'

const WhoTemplate = ({ data: { who, seo, allSite, meta }, location }) => {
  const data = path(['data'], who)
  const { body, image, theme, title } = data
  return (
    <TemplateWrapper
      {...{ allSite }}
      {...{ location }}
      {...{ image }}
      {...{ meta }}
      {...{ seo }}
      {...{ title }}
    >
      <ScrollChild {...{ theme }}>
        <ImageStatement data={pick(['title', 'statement', 'image'], data)} />
      </ScrollChild>
      {body ? (
        body.map(section => {
          switch (section.__typename) {
            case 'PrismicWhoBodyColumns':
              return (
                <ScrollChild
                  key={uuid()}
                  theme={section.primary.coltheme}
                  style={{ position: 'relative' }}
                >
                  <Columns
                    key={uuid()}
                    items={section.items}
                    primary={section.primary}
                  />
                </ScrollChild>
              )
            case 'PrismicWhoBodyLead':
              return (
                <ScrollChild
                  key={uuid()}
                  image={section.primary.leadimage}
                  backimage={
                    includes('image', section.primary.leadtheme)
                      ? 'true'
                      : 'false'
                  }
                  style={{ position: 'relative' }}
                  theme={section.primary.leadtheme}
                >
                  <Lead key={uuid()} primary={section.primary} />
                </ScrollChild>
              )
            case 'PrismicWhoBodyImage':
              return (
                <ScrollChild
                  key={uuid()}
                  items={section.items}
                  theme={section.primary.imgtheme}
                  style={{ position: 'relative' }}
                >
                  <ImageSlider
                    items={section.items}
                    primary={section.primary}
                    key={uuid()}
                  />
                </ScrollChild>
              )
            case 'PrismicWhoBodyImageCaption':
              return (
                <ScrollChild
                  key={uuid()}
                  theme={section.primary.sictheme}
                  style={{ position: 'relative' }}
                >
                  <ImageCaption
                    key={uuid()}
                    items={section.items}
                    primary={section.primary}
                  />
                </ScrollChild>
              )
            default:
              return <Fragment key={uuid()} />
          }
        })
      ) : (
        <ScrollChild theme={'black'} />
      )}
      <ScrollChild theme={'black'}>
        <Footer {...{ meta }} />
      </ScrollChild>
    </TemplateWrapper>
  )
}

export default WhoTemplate

export const query = graphql`
  query WhoTemplateQuery($lang: String!) {
    who: prismicWho(lang: { eq: $lang }) {
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
              colheading {
                html
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
                url
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
                url
                localFile {
                  childImageSharp {
                    sizes(maxWidth: 720, quality: 80) {
                      ...GatsbyImageSharpSizes_noBase64
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
    seo: prismicWho(lang: { eq: $lang }) {
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
    allSite: allSitePage {
      edges {
        node {
          path
        }
      }
    }
    meta: prismicMeta(lang: { eq: $lang }) {
      ...MetaFragment
    }
  }
`
