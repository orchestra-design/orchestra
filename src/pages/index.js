import React, { Fragment } from 'react'
import { push } from 'gatsby-link'
import { lifecycle } from 'recompose'
import Helmet from 'react-helmet'

import { Header } from '../components/blocks'

import favicon from '../assets/favicon.png'

const withLifecicle = lifecycle({
  state: { lang: 'ru' },
  componentDidMount() {
    const language = window.navigator.userLanguage || window.navigator.language
    language.includes('en') && push('/en')
    language.includes('ru') && push('/ru')
  }
})

const Index = withLifecicle(({ data }) => {
  const { 
    sitetitle, sitedescription,
    sitekeywords
  } = data.site.data
  
  return (
    <Fragment>
      <Helmet
        defaultTitle={sitetitle}
        titleTemplate={`${sitetitle} | %s`}
        meta={[
          { name: 'description', content: sitedescription },
          { name: 'keywords', content: sitekeywords },
          { name: 'robots', content: 'all' },
          { name: 'apple-mobile-web-app-title', content: sitetitle }
        ]}
      >
        <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
      </Helmet>
      <Header />
    </Fragment>
  )  
})

export default Index

export const query = graphql`
  query SiteQuery {
    site: prismicSite {
      data {
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