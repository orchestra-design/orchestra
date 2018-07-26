import React from 'react'
import { graphql } from 'gatsby'

import { path, pick, uuid } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { ImageCaptionWithDigits, ImageStatement } from '../components/blocks'

const WhatTemplate = ({data: {
  what, seo, allSite, links, meta
}}) => {
  const data = path(['data'], what)
  const { body, image, theme, title } = data
  
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
        image={JSON.stringify(image)}
        {...{theme}} 
      ><ImageStatement 
        data={pick(['title', 'statement', 'image', 'description'], data)}
      /></div>
      {body.map(({ primary, items }, i) =>
        <div key={uuid()}
          right-image={JSON.stringify(primary.sicimage)}
          theme={primary.sictheme}
        ><ImageCaptionWithDigits key={uuid()}
           {...{i}}
           {...{items}}
           lang={seo.lang}
           {...{primary}}
          /></div>
      )}
    </TemplateWrapper>
  )
}

export default WhatTemplate

export const query = graphql`
  query WhatTemplateQuery($lang: String!) {
    what: prismicWhat(lang: {eq: $lang}) {
      data {
        title
        statement {
          text
        }
        description
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
          primary {
            sicgrid
            sictheme
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
            sictextlink {
              url
            }
            sictextimage {
              localFile {
                childImageSharp {
                  sizes(maxWidth: 240, quality: 80) {
                    ...GatsbyImageSharpSizes_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
    seo: prismicWhat(lang: {eq: $lang}) {
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
    links: prismicWhat(lang: {eq: $lang}) {
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