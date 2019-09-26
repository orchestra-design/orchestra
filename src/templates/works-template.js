/* global tw */
import React from 'react'
import { graphql } from 'gatsby'
import styled from 'react-emotion'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { Footer, WorksGrid, WorksFilters } from '../components/blocks'
import { Container, ScrollChild } from '../components/elements'

const FirstScreen = styled(Container)`
  ${tw(['mt-q72', 'md:mt-q112'])};
`

const WorksTemplate = ({
  data: { workspage, allworks, seo, allSite, meta },
  location,
}) => {
  const title = path(['data', 'title', 'text'], workspage)
  const worksLinks = path(['data', 'links'], workspage)

  return (
    <TemplateWrapper
      {...{ seo }}
      {...{ allSite }}
      notDown={true}
      {...{ location }}
      {...{ meta }}
      {...{ title }}
    >
      <ScrollChild theme={'white'}>
        <FirstScreen />
      </ScrollChild>
      <ScrollChild theme={'white'}>
        <WorksFilters {...{ allworks }} lang={seo.lang} />
        <WorksGrid {...{ allworks }} {...{ worksLinks }} />
      </ScrollChild>
      <ScrollChild theme={'white'}>
        <Footer {...{ meta }} />
      </ScrollChild>
    </TemplateWrapper>
  )
}

export default WorksTemplate

export const query = graphql`
  query WorksTemplateQuery($lang: String!) {
    workspage: prismicWorks(lang: { eq: $lang }) {
      data {
        title {
          text
        }
        links {
          image {
            url
            localFile {
              childImageSharp {
                fluid(maxWidth: 768, quality: 80) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          hoverimage {
            url
            localFile {
              childImageSharp {
                fluid(maxWidth: 768, quality: 80) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          link {
            url
            document {
              ...on PrismicWork {
                uid
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
    seo: prismicWorks(lang: { eq: $lang }) {
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
