/* global tw */
import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'

import {
  isNil, not, path
} from '../helpers'

import TemplateWrapper from '../components/layouts'
import { Row } from '../components/elements'

const Section = styled('section')`
  ${tw('min-h-screen items-center justify-center')}
  ${Row}; 
  color: ${props => props.theme.color};
  transition: all .6s ease-in-out .2s;
`

const WorkTemplate = ({ data: { work, seo, allSite, links }}) => {
  const title = path(['data', 'title', 'text'], work)
  const color = path(['data', 'color'], work)
  const image = path(['data', 'image'], work)
  return (
    <Fragment>
      <TemplateWrapper 
        {...{allSite}}
        {...{color}}
        {...{image}}
        {...{links}}
        {...{seo}}
        {...{title}}
      >
        <div className={css`${tw('h-screen bg-transparent')}; height: 100vh;`} theme="image" >
          <h1>{ title }</h1>
          <div>{ work.data.description }</div>
        </div>
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="white" />
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="black" />
        {not(isNil(work.data.body)) && work.data.body.map(({primary}, i) =>
          <div key={i+6000} theme={primary.sictheme} >
            <Section key={i+5000} >
              <Img key={i+4000} 
                className={css`${tw('flex')};`}
                resolutions={primary.sicimage.localFile.childImageSharp.resolutions} 
                alt={primary.siccaption}
              />
              <div key={i+3000} className={css`${tw('flex flex-col w-1/3')};`}>
                <div key={i+1000} dangerouslySetInnerHTML={{ __html: primary.sicheader.html }} />
                <div key={i+2000} dangerouslySetInnerHTML={{ __html: primary.sictext.html }} />
              </div>
            </Section>
          </div>
        )}
      </TemplateWrapper>
    </Fragment>
  )
}

export default WorkTemplate

export const query = graphql`
  query WorkTemplateQuery($slug: String!, $lang: String!) {
    work: prismicWork(uid: {eq: $slug}, lang: {eq: $lang}) {
      data {
        title {
          text
        }
        description
        image {
           localFile {
            childImageSharp {
              sizes(maxWidth: 1920) {
                ...GatsbyImageSharpSizes_withWebp
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
  }
`