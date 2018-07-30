/* global tw */
import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'


import { 
  ImageSlider, WorkImageCaption, 
  WorkStatement,
} from '../components/blocks'

import {
  concat, equals, mergeDeepWith, 
  path, pick, safeMap, uuid, and
} from '../helpers'

import TemplateWrapper from '../components/layouts'


const WorkTemplate = ({ data: { 
  work, seo, allSite, links, meta 
}}) => {
  const data = path(['data'], work)
  const tags = path(['tags'], work)
  const { body, color, image, statement } = data
  const appendedLinks = mergeDeepWith(concat, links, 
    {data: { 
      headerlinks: [{
          linktitle: seo.lang.includes('ru') ? 'Проекты' : 'Works',
          link: {
            url: `/${seo.lang.replace('-us', '')}/projects`
          }
        }]
      }
    }
  )

  return (
    <Fragment>
      <TemplateWrapper 
        {...{allSite}}
        {...{color}}        
        links={appendedLinks}
        {...{image}}
        {...{meta}}
        {...{seo}}
        title={statement.text}
      >
        <WorkStatement 
          data={pick([
            'client', 'customtags', 'descriptiontext', 
            'image', 'location', 'statement', 'status', 
            'theme', 'timeline', 'title', 'type'
          ], data)}
          lang={seo.lang}
          {...{tags}}
        />
        {safeMap(section => (
          <Fragment key={uuid()} >
          {and(equals('PrismicWorkBodyImage', section.__typename),
            <ImageSlider key={uuid()}
              items={section.items}
              primary={section.primary}
              theme={section.primary.imgtheme}
            />
          )}
          {equals('PrismicWorkBodyImageCaption', section.__typename) &&
            <WorkImageCaption key={uuid()}
              {...{color}} 
              items={section.items}
              primary={section.primary}
            />
          }
          </Fragment>
        ))(body)}
      </TemplateWrapper>
    </Fragment>
  )
}

export default WorkTemplate

export const query = graphql`
  query WorkTemplateQuery($slug: String!, $lang: String!) {
    work: prismicWork(uid: {eq: $slug}, lang: {eq: $lang}) {
      tags
      data {
        title
        statement {
          text
        }
        image {
          localFile {
            childImageSharp {
              sizes(maxWidth: 1920, quality: 80) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
        color
        theme
        descriptiontext {
          html
        }
        location
        type
        status
        timeline
        client
        customtags {
          tagtitle
          tagdescription
        }    
        body {
          __typename
          ... on PrismicWorkBodyImage {
            primary {
              imgtheme
              imgtext {
                html
              }
            }
            items {          
              imgimage {
                localFile {
                  childImageSharp {
                    sizes(maxWidth: 1200, quality: 80) {
                      ...GatsbyImageSharpSizes
                    }
                  }
                }
              }
            }
          }
          ... on PrismicWorkBodyImageCaption {
            primary {
              sicgrid
              sictheme
              sicimage {
                localFile {
                  childImageSharp {
                    sizes(maxWidth: 720, quality: 80) {
                      ...GatsbyImageSharpSizes_noBase64
                    }
                  }
                }
              }
              siccaption
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
    seo: prismicWork(uid: {eq: $slug}, lang: {eq: $lang}) {
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
    links: prismicWorks(lang: {eq: $lang}) {
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