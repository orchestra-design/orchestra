import React from 'react'
import { graphql } from 'gatsby'

import { path, pick, uuid } from '../helpers'
import TemplateWrapper from '../components/layouts'
import {
  Footer,
  ImageCaptionWithDigits,
  ImageStatement,
} from '../components/blocks'
import { ScrollChild } from '../components/elements'

const WhatTemplate = ({ data: { what, seo, allSite, meta }, location }) => {
  const data = path(['data'], what)
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
      <ScrollChild image={JSON.stringify(image)} {...{ theme }}>
        <ImageStatement
          data={pick(['title', 'statement', 'image', 'description'], data)}
        />
      </ScrollChild>
      {body.map(({ primary, items }, i) => (
        <ScrollChild
          key={uuid()}
          right-image={JSON.stringify(primary.sicimage)}
          sicgrid={primary.sicgrid}
          theme={primary.sictheme}
        >
          <ImageCaptionWithDigits
            key={uuid()}
            {...{ i }}
            {...{ items }}
            lang={seo.lang}
            {...{ primary }}
          />
        </ScrollChild>
      ))}
      <ScrollChild theme={'black'}>
        <Footer {...{ meta }} />
      </ScrollChild>
    </TemplateWrapper>
  )
}

export default WhatTemplate

export const query = graphql`
  query WhatTemplateQuery($lang: String!) {
    what: prismicWhat(lang: { eq: $lang }) {
      data {
        title
        statement {
          text
        }
        description
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
          primary {
            sicgrid
            sictheme
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
          }
          items {
            sictext {
              html
            }
            sictextlink {
              url
            }
            sictextimage {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 480, quality: 80) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
    seo: prismicWhat(lang: { eq: $lang }) {
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
