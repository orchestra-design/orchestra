/* global tw */
import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import {
  path, concat, mergeDeepWith
} from '../helpers'

import TemplateWrapper from '../components/layouts'


const WorkTemplate = ({ data: { 
  work, seo, allSite, links, meta 
}}) => {
  const title = path(['data', 'title', 'text'], work)
  const color = path(['data', 'color'], work)
  const image = path(['data', 'image'], work)
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
        {...{title}}
      >
        <div 
          className={css`${tw('h-screen bg-transparent')};`} 
          theme="image"
        >
          <h1>{ title }</h1>
          <div>{ work.data.description }</div>
        </div>
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="white" />
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="black" />        
      </TemplateWrapper>
    </Fragment>
  )
}

export default WorkTemplate

export const query = graphql`
  query WorkTemplateQuery($slug: String!, $lang: String!, $color: String!) {
    work: prismicWork(uid: {eq: $slug}, lang: {eq: $lang}) {
      data {
        title {
          text
        }
        description
        image {
           localFile {
            childImageSharp {
              sizes(maxWidth: 1920, traceSVG: {
                color: $color
                turnPolicy: TURNPOLICY_MINORITY
                blackOnWhite: false
              }) {
                ...GatsbyImageSharpSizes_tracedSVG
              }
            }
          }
        }
        color
        body {
          slice_type
          primary {
            sictheme
            sicimage {
              localFile {
                childImageSharp {
                  resolutions(width: 400, height: 300, quality: 80) {
                    ...GatsbyImageSharpResolutions_tracedSVG
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