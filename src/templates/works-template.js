/* global tw */
import React from 'react'
import { graphql } from 'gatsby'
import styled from 'react-emotion'

import { path } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { Footer, WorksGrid, WorksFilters } from '../components/blocks'
import { Container, Heading1, ScrollChild } from '../components/elements'

const FirstScreen = styled(Container)`
  ${tw(['flex', 'flex-col', 'justify-end'])};
  @media (max-width: 599px) {
    height: 50vw;
  }
  @media (min-width: 600px) {
    height: 50vh;
  }
`

const Title = styled('h1')`
  ${Heading1};
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
        <FirstScreen>
          <Title>{title}</Title>
        </FirstScreen>
      </ScrollChild>
      <ScrollChild theme={'white'}>
        <WorksFilters {...{ allworks }} lang={seo.lang} />
        <WorksGrid {...{ allworks }} {...{ worksLinks }} />
      </ScrollChild>
      <ScrollChild theme={'black'}>
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
            localFile {
              childImageSharp {
                sizes(maxWidth: 768, quality: 80) {
                  ...GatsbyImageSharpSizes_noBase64
                }
              }
            }
          }
          hoverimage {
            localFile {
              childImageSharp {
                sizes(maxWidth: 768, quality: 80) {
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
