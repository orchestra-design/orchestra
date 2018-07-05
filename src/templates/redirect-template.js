import React from 'react'
import { push } from 'gatsby-link'
import { lifecycle } from 'recompose'
import { graphql } from 'gatsby'

import TemplateWrapper from '../components/layouts'

const withLifecicle = lifecycle({
  state: { lang: 'ru' },
  componentDidMount() {
    const path = window.location.pathname.replace(/\/$/, '')
    const language = window.navigator.userLanguage || window.navigator.language
    language.includes('en') && push(`${path}/en`)
    language.includes('ru') && push(`${path}/ru`)
  }
})

const RedirectTemplate = withLifecicle(({ data: { work, site }}) => (
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
  ></TemplateWrapper>
))

export default RedirectTemplate

export const query = graphql`
  query RedirectTemplateQuery($slug: String!) {
    work: prismicWork(uid: {eq: $slug}, lang: {eq: "ru"}) {
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
    site: prismicSite(lang: {eq: "ru"}) {
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
