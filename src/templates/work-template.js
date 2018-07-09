/* global tw */
import React from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'
import { compose, withHandlers } from 'recompose'
import offset from 'dom-helpers/query/offset'
import { connect } from 'react-redux'

import { changeTheme, blackenLogo } from '../actions'
import TemplateWrapper from '../components/layouts'
import { Row } from '../components/elements'

const Connected = connect(
  ({ storedTheme }) => ({ storedTheme }),
  { changeTheme, blackenLogo }
)

const withScroll = compose(
  Connected,
  withHandlers({
    scroll: props => event => {
      Array
        .from(event.target.childNodes)
        .map(child => {
          const childOffset = offset(child)
          const currentTheme = props.theme
          const newTheme = child.attributes.theme.value
          if (childOffset.top < 0 && (childOffset.top + childOffset.height) > 0) {
            newTheme !== currentTheme && props.changeTheme(newTheme)
            newTheme !== currentTheme && !newTheme.includes('image') ? props.blackenLogo(true) : props.blackenLogo(false)
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

const WorkTemplate = withScroll(({ data: { work, site }, scroll}) => {
  return (
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
      <Back color={work.data.color} />
      <div onScroll={scroll} className={css`${tw('fixed pin overflow-y-scroll')};`} >
        <div className={css`${tw('h-screen bg-transparent')};`} theme="image"  >
          <h1>{ work.data.title.text }</h1>
          <div>{ work.data.description }</div>
        </div>
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="colored-inverse"  />
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="white" />
        {work.data.body.map(({primary}, i) =>
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