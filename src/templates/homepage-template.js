/* global tw */
import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import styled from 'react-emotion'

import {
  Columns,
  Footer,
  Lead,
  TickSlider,
  WorksFilters,
  WorksGrid,
} from '../components/blocks'
import { Container, Heading2, ScrollChild } from '../components/elements'
import { safeMap, path, uuid } from '../helpers'
import TemplateWrapper from '../components/layouts'

const Title = styled('h2')`
  ${Heading2};
  ${tw(['md:mt-q72'])};
`

const IndexTemplate = ({
  data: { page, allworks, works, seo, allSite, meta },
  location,
}) => {
  const body = path(['data', 'body'], page)
  const image = path(['data', 'slider'], page)
  const worksLinks = path(['data', 'links'], works)

  return (
    <TemplateWrapper
      {...{ allSite }}
      color="white"
      {...{ image }}
      {...{ location }}
      {...{ meta }}
      {...{ seo }}
      title={seo.data.seotitle}
    >
      <ScrollChild theme={'image'}>
        <TickSlider {...{ image }} {...{ meta }} />
      </ScrollChild>
      {safeMap(section => {
        switch (section.__typename) {
          case 'PrismicHomepageBodyColumns':
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
          case 'PrismicHomepageBodyLead':
            return (
              <ScrollChild
                key={uuid()}
                theme={section.primary.leadtheme}
                style={{ position: 'relative' }}
              >
                <Lead key={uuid()} primary={section.primary} />
              </ScrollChild>
            )
          default:
            return <Fragment key={uuid()} />
        }
      })(body)}
      <ScrollChild theme={'white'}>
        <Container>
          <Title>{seo.lang.includes('ru') ? 'Проекты' : 'Works'}</Title>
        </Container>
        <WorksFilters {...{ allworks }} />
        <WorksGrid {...{ allworks }} {...{ worksLinks }} />
      </ScrollChild>
      <ScrollChild theme={'black'}>
        <Footer {...{ meta }} />
      </ScrollChild>
    </TemplateWrapper>
  )
}

export default IndexTemplate

export const query = graphql`
  query IndexTemplateQuery($lang: String!) {
    page: prismicHomepage(lang: { eq: $lang }) {
      data {
        slider {
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          worktitle {
            text
          }
          caption
          theme
          link {
            url
          }
        }
        body {
          __typename
          ... on PrismicHomepageBodyColumns {
            primary {
              coltheme
              colbackimage {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1920, quality: 80) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            }
            items {
              colimage {
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
          ... on PrismicHomepageBodyLead {
            primary {
              leadtheme
              leadtext {
                text
              }
            }
          }
        }
      }
    }
    allworks: allPrismicWork(filter: { lang: { eq: $lang } }) {
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
            title
            statement {
              text
            }
            color
          }
        }
      }
    }
    works: prismicWorks(lang: { eq: $lang }) {
      data {
        links {
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 768) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          hoverimage {
            localFile {
              childImageSharp {
                fluid(maxWidth: 768) {
                  ...GatsbyImageSharpFluid_noBase64
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
    seo: prismicHomepage(lang: { eq: $lang }) {
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
