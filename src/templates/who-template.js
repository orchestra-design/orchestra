import React from 'react'
import { graphql } from 'gatsby'

import { safeMap, path, uuid  } from '../helpers'
import TemplateWrapper from '../components/layouts'
import { 
  ImageCaption, ImageStatement, Lead 
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
        section.__typename === 'PrismicWhoBodyLead' 
        ? <div key={uuid()} theme={section.primary.leadtheme} style={{position: 'relative'}} >
            <Lead text={section.primary.leadtext.text} />
          </div>
        : section.__typename === 'PrismicWhoBodyImageCaption'
        ? <div key={uuid()} theme={section.primary.sictheme} style={{position: 'relative'}} >
            <ImageCaption 
              items={section.items}
              primary={section.primary}
            />
          </div>
        : null
      ))(body)}
    </TemplateWrapper>
  )
}

export default WhoTemplate

export const query = graphql`
  query WhoTemplateQuery($lang: String!, $color: String!) {
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
              sizes(maxWidth: 1920, quality: 80, traceSVG: {
                color: $color
                turnPolicy: TURNPOLICY_MINORITY
                blackOnWhite: false
              }) {
                ...GatsbyImageSharpSizes_tracedSVG
              }
            }
          }
        }
        body {
          __typename
          ... on PrismicWhoBodyLead {
            primary {
              leadtheme
              leadtext {
                text
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