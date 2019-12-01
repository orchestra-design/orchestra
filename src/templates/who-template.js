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
      <ScrollChild {...{ theme }} isFirst>
        <ImageStatement data={pick(['title', 'image'], data)} />
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
                    cols={4}
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
      <ScrollChild theme={'white'}>
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
        theme
        image {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 80) {
                ...GatsbyImageSharpFluid
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
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 480, quality: 80) {
                      ...GatsbyImageSharpFluid_noBase64
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
              leadtext {
                text
                html
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
          url
          localFile {
            childImageSharp {
              fixed(width: 1200, height: 630) {
                ...GatsbyImageSharpFixed_noBase64
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
/* leadimage {
    url
    localFile {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 80) {
          ...GatsbyImageSharpFluid
        }
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
            fluid(maxWidth: 1920, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
  sicimage {
    url
    localFile {
      childImageSharp {
        fluid(maxWidth: 720, quality: 80) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
  */
