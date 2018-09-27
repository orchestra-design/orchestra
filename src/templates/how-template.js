import React from 'react'
import { graphql } from 'gatsby'

import { map, path } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { Footer, JumboSlider, Points } from '../components/blocks'
import { ScrollChild } from '../components/elements'

const HowTemplate = ({ data: { how, seo, allSite, meta }, location }) => {
  const data = path(['data'], how)
  const { theme } = data
  const image = map(
    ({ jumboimage }) => ({ image: jumboimage }),
    path(['jumbo'], data)
  )
  const points = path(['points'], data)
  const title = path(['title', 'text'], data)
  return (
    <TemplateWrapper
      {...{ allSite }}
      {...{ image }}
      {...{ location }}
      notDown={true}
      {...{ meta }}
      {...{ seo }}
      {...{ title }}
    >
      <ScrollChild {...{ theme }}>
        <JumboSlider {...{ data }} />
      </ScrollChild>
      <ScrollChild theme={'white'}>
        <Points {...{ points }} />
      </ScrollChild>
      <ScrollChild theme={'black'}>
        <Footer {...{ meta }} />
      </ScrollChild>
    </TemplateWrapper>
  )
}

export default HowTemplate

export const query = graphql`
  query HowTemplateQuery($lang: String!) {
    how: prismicHow(lang: { eq: $lang }) {
      data {
        title {
          text
        }
        theme
        jumbo {
          jumbotitle {
            text
          }
          jumboimage {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1920, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        points {
          pointsimage {
            localFile {
              childImageSharp {
                fluid(maxWidth: 480, quality: 80) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          pointsheading {
            text
          }
          pointstext {
            html
          }
        }
      }
    }
    seo: prismicHow(lang: { eq: $lang }) {
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
