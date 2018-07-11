import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { css } from 'react-emotion'

import TemplateWrapper from '../components/layouts'

const WorksTemplate = ({ data: { works, allSite }}) => {
  return (
    <TemplateWrapper
     seo={{
        data: {
          uid: works.uid,
          seotitle: works.data.seotitle,
          seodescription: works.data.seodescription,
          seokeywords: works.data.seokeywords,
          seoimage: works.data.seoimage,
        }
      }}
      lang={works.lang}
      {...{allSite}}
    >
      <div>{works.data.title.text}</div>
      <div className={css`margin-top: 100px;`} >
      {works.data.headerlinks.map(({link, linktitle}, i) => 
        <Link key={i} to={link.url}>{ linktitle }</Link>
      )}
      </div>
    </TemplateWrapper>
  )
}

export default WorksTemplate

export const query = graphql`
  query WorksTemplateQuery($lang: String!) {
    works: prismicWorks(lang: {eq: $lang}) {
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
        headerlinks {
          linktitle
          link {
            url
          }
        }
        title {
          text
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