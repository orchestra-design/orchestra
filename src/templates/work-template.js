/* global tw */
import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'
import Img from 'gatsby-image'
import { compose, withState, withHandlers } from 'recompose'
import offset from 'dom-helpers/query/offset'

import { Header } from '../components/blocks'

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


const WorkTemplate = withScroll(({ data: { work }, isScroll, scroll}) => (
  <Fragment>
    <Img 
      sizes={work.data.image.localFile.childImageSharp.sizes} 
      className={css`${tw('pin')};`} 
      style={{position: 'fixed', zIndex: -1}} 
    />
    <div className={css`${tw('fixed pin')}; background-color: ${isScroll[1] && isScroll[1].top < 200 && '#000000'};`} />
    <div className={css`${tw('fixed pin')}; background-color: ${isScroll[2] && isScroll[2].top < 200 && '#ffffff'};`} />
    <Header />
    <div onScroll={scroll} className={css`${tw('fixed pin overflow-y-scroll')};`} >
      <div className={css`${tw('h-screen bg-transparent')};`} >
        <h1>{ work.data.title.text }</h1>
        <div>{ work.data.description }</div>
      </div>
      <div className={css`${tw('bg-transparent')}; height: 100vh;`} />
      <div className={css`${tw('bg-transparent')}; height: 100vh;`} />
    </div>
  </Fragment>
))

export default WorkTemplate

export const query = graphql`
  query WorkTemplateQuery($slug: String!) {
    work: prismicWork(uid: {eq: $slug}, lang: {eq: "ru"}) {
      uid
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
      }
    }
  }
`