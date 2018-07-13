import React from 'react'
import { graphql } from 'gatsby'
import { Spring } from 'react-spring'

import TemplateWrapper from '../components/layouts'
//import { Homepage } from '../components/blocks'

const IndexTemplate = ({ data: { page, allSite, links } }) => {
  
  return (
    <TemplateWrapper 
      seo={{
        data: {
          uid: null,
          seotitle: page.data.seotitle,
          seodescription: page.data.seodescription,
          seokeywords: page.data.seokeywords,
          seoimage: page.data.seoimage,
        }
      }}
      color='white'
      image={page.data.slider[0].image}
      title={page.data.seotitle}
      lang={page.lang}
      {...{allSite}}
      {...{links}}
    >
      {/* <Homepage data={page.data} /> */}
      <div theme="white" style={{height: '100vh'}} >
        <Spring from={{ color: 'black' }} to={{ color: 'fuchsia' }} >
        {({...styles}) => <h1 style={styles}>Poop!</h1>}
        </Spring>
      </div>
      <div theme="image" style={{height: '100vh'}} >{ page.data.seotitle }</div>
      <div theme="black" style={{height: '100vh'}} />
    </TemplateWrapper>
  )
}

export default IndexTemplate

export const query = graphql`
  query IndexTemplateQuery($lang: String!) {
    page: prismicHomepage(lang: {eq: $lang}) {
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
        slider {
          image {
            localFile {
              childImageSharp {
                sizes(maxWidth: 1920) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
          caption
        }
      }
    }
    links: prismicHomepage(lang: {eq: $lang}) {
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