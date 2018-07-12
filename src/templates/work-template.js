/* global tw */
import React from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { camelCase, isNil, not, offset, path } from '../helpers'
import { changeTheme } from '../actions'
import TemplateWrapper from '../components/layouts'
import { Row } from '../components/elements'

const Connected = connect(
  ({ storedTheme }) => ({ storedTheme }),
  { changeTheme }
)

const withScroll = compose(
  Connected,
  withHandlers({
    scroll: props => event => {
     const scrollChildren = Array.from(event.target.childNodes)
     scrollChildren !== null && scrollChildren.map(child => {
        const childOffset = offset(child)
        const currentTheme = props.theme
        const newTheme = camelCase(child.attributes.theme.value)
        if (childOffset.top < 0 && (childOffset.top + childOffset.height) > 0) {
          newTheme !== currentTheme && props.changeTheme(newTheme)
        }
        return null
      })
    }
  })
)

const Back = styled('div')`
  ${tw('fixed pin')}; 
  background-color: ${props => props.theme.backgroundColor || props.color};
  transition: all .6s ease-in-out;
`

const Section = styled('section')`
  ${tw('min-h-screen items-center justify-center')}
  ${Row}; 
  color: ${props => props.theme.color};
  transition: all .6s ease-in-out .2s;
`

const WorkTemplate = withScroll(({ data: { work, allSite, links }, scroll}) => {
  return (
    <TemplateWrapper 
      seo={{
        data: {
          uid: work.uid,
          seotitle: work.data.seotitle,
          seodescription: work.data.seodescription,
          seokeywords: work.data.seokeywords,
          seoimage: work.data.seoimage,
        }
      }}
      lang={work.lang}
      {...{allSite}}
      {...{links}}
    >
      <Img 
        sizes={work.data.image.localFile.childImageSharp.sizes} 
        className={css`${tw('pin')};`} 
        style={{position: 'fixed', zIndex: -1}} 
      />
      <Back color={work.data.color} />
      <div onScroll={scroll} className={css`${tw('fixed pin overflow-y-scroll')};`} >
        <div className={css`${tw('h-screen bg-transparent')};`} theme="image"  >
          <h1>{ path(['data', 'title', 'text'], work) }</h1>
          <div>{ work.data.description }</div>
        </div>
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="black"  />
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="white" />
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
      </div>
    </TemplateWrapper>
  )
})

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