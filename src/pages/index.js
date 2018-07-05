import React from 'react'
import { push } from 'gatsby-link'
import { lifecycle } from 'recompose'
import { graphql } from 'gatsby'

import TemplateWrapper from '../components/layouts'

const withLifecicle = lifecycle({
  state: { lang: 'ru' },
  componentDidMount() {
    const language = window.navigator.userLanguage || window.navigator.language
    language.includes('en') && push('/en')
    language.includes('ru') && push('/ru')
  }
})

const Index = withLifecicle(({ data: { site } }) => 
  <TemplateWrapper {...{site}} lang="ru"></TemplateWrapper>
)

export default Index

export const query = graphql`
  query IndexQuery {
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