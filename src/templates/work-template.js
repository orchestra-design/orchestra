/* global tw */
import React from 'react'
import { graphql } from 'gatsby'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { changeTheme, collapseMenu, srollMenu } from '../actions'
import {
  and, camelCase, equals, F, gt,
  ifElse, isNil, lt, not, offset, path
} from '../helpers'
import TemplateWrapper from '../components/layouts'
import { Row } from '../components/elements'

const Connected = connect(
  ({ collapsedMenu, hiddenMenu, storedTheme }) => ({ collapsedMenu, hiddenMenu, storedTheme }),
  { changeTheme, collapseMenu, srollMenu }
)

const withScroll = compose(
  Connected,
  withHandlers({
    scroll: props => event => {
      const scrollChildren = Array.from(event.target.childNodes)
      not(isNil(scrollChildren)) && scrollChildren.map((child, i) => {
        const childOffset = offset(child)
        const newTheme = camelCase(child.attributes.theme.value)
        ifElse(
          ({ top, height }) => and(lt(top, 0), gt((top + height), 0)),
          () => not(equals(newTheme, props.storedTheme)) && props.changeTheme(newTheme),
          F
        )(childOffset)
        equals(i, 0) && ifElse(
          ({ top }) => lt(top, -400),
          () => not(equals(props.hiddenMenu, true)) && props.srollMenu(true),
          () => not(equals(props.hiddenMenu, false)) && props.srollMenu(false)
        )(childOffset)
        equals(i, 1) && ifElse(
          ({ top }) => lt(top, -200),
          () => not(equals(props.collapsedMenu, true)) && props.collapseMenu(true),
          () => not(equals(props.collapsedMenu, false)) && props.collapseMenu(false)
        )(childOffset)        
        return F
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
  const title = path(['data', 'title', 'text'], work)
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
      {...{title}}
    >
      <Img 
        sizes={work.data.image.localFile.childImageSharp.sizes} 
        className={css`${tw('pin')};`} 
        style={{position: 'fixed', zIndex: -1}} 
      />
      <Back color={work.data.color} />
      <div onScroll={scroll} className={css`${tw('fixed pin overflow-y-scroll')};`} >
        <div className={css`${tw('h-screen bg-transparent')};`} theme="image"  >
          <h1>{ title }</h1>
          <div>{ work.data.description }</div>
        </div>
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="white" />
        <div className={css`${tw('bg-transparent')}; height: 100vh;`} theme="black"  />
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