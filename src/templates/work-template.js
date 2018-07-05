/* global tw */
import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'
import Img from 'gatsby-image'
import { compose, withState, withHandlers } from 'recompose'
import offset from 'dom-helpers/query/offset'

import TemplateWrapper from '../components/layouts'

const withScroll = compose(
  withState('isScroll', 'updateValue', []),
  withHandlers({
    scroll: props => event => {
      const children = Array.from(event.target.childNodes)
      const childrenOffset = children.map(offset)
      props.updateValue(childrenOffset)
    }
  })
)


const WorkTemplate = withScroll(({ data: { work, site }, isScroll, scroll}) => (
  <TemplateWrapper 
    site={{
      data: {
        uid: work.uid,
        siteurl: site.data.siteurl,
        sitetitle: work.data.seotitle || site.data.sitetitle,
        sitedescription: work.data.seodescription || site.data.sitedescription,
        sitekeywords: work.data.seokeywords || site.data.sitekeywords,
        siteimage: work.data.seoimage || site.data.siteimage,
      }
    }}
    lang={work.lang} 
  >
    <Img 
      sizes={work.data.image.localFile.childImageSharp.sizes} 
      className={css`${tw('pin')};`} 
      style={{position: 'fixed', zIndex: -1}} 
    />
    <div className={css`${tw('fixed pin')}; background-color: ${isScroll[1] && isScroll[1].top < 200 && '#000000'};`} />
    <div className={css`${tw('fixed pin')}; background-color: ${isScroll[2] && isScroll[2].top < 200 && '#ffffff'};`} />
    <div onScroll={scroll} className={css`${tw('fixed pin overflow-y-scroll')};`} >
      <div className={css`${tw('h-screen bg-transparent')};`} >
        <h1>{ work.data.title.text }</h1>
        <div>{ work.data.description }</div>
      </div>
      <div className={css`${tw('bg-transparent')}; height: 100vh;`} />
      <div className={css`${tw('bg-transparent')}; height: 100vh;`} />
    </div>
  </TemplateWrapper>
))

export default WorkTemplate

export const query = graphql`
  query WorkTemplateQuery($slug: String!, $lang: String!) {
    work: prismicWork(uid: {eq: $slug}, lang: {eq: $lang}) {
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
      }
    }
    site: prismicSite(lang: {eq: $lang}) {
      data {
        siteurl
        sitetitle
        sitedescription
        sitekeywords
        siteimage {
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
  }
`