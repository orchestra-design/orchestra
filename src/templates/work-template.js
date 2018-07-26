/* global tw */
import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'


import { 
  ImageCaption, 
  WorkStatement,
} from '../components/blocks'

import {
  concat, equals, mergeDeepWith, 
  path, safeMap, uuid 
} from '../helpers'

import TemplateWrapper from '../components/layouts'


const WorkTemplate = ({ data: { 
  work, seo, allSite, links, meta 
}}) => {
  const data = path(['data'], work)
  const { body, color, image, theme, statement } = data
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
        <div {...{theme}} >
          <WorkStatement {...{data}} />
        </div>
        {safeMap(section => (
          <Fragment key={uuid()} >
          {equals('PrismicWorkBodyImageCaption', section.__typename) &&
            <div key={uuid()} theme={section.primary.sictheme} style={{position: 'relative'}} >
              <ImageCaption key={uuid()}
                items={section.items}
                primary={section.primary}
              />
            </div>
          }
          </Fragment>
        ))(body)}
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="white" />
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="black" />        
      </TemplateWrapper>
    </Fragment>
  )
}

export default WorkTemplate

export const query = graphql`
  query WorkTemplateQuery($slug: String!, $lang: String!) {
    work: prismicWork(uid: {eq: $slug}, lang: {eq: $lang}) {
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
        body {
          __typename
          ... on PrismicWorkBodyImageCaption {
            primary {
              sicgrid
              sictheme
              sicimage {
                url
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