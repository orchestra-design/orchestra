import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { css } from 'react-emotion'

import TemplateWrapper from '../components/layouts'

const WhoTemplate = ({ data: { who, allSite }}) => {
  return (
    <TemplateWrapper
     seo={{
        data: {
          uid: who.uid,
          seotitle: who.data.seotitle,
          seodescription: who.data.seodescription,
          seokeywords: who.data.seokeywords,
          seoimage: who.data.seoimage,
        }
      }}
      lang={who.lang}
      {...{allSite}}
    >
      <div>{who.data.title}</div>
      <div className={css`margin-top: 100px;`} >
      {who.data.headerlinks.map(({link, linktitle}, i) => 
        <Link key={i} to={link.url}>{ linktitle }</Link>
      )}
      </div>
    </TemplateWrapper>
  )
}

export default WhoTemplate

export const query = graphql`
  query WhoTemplateQuery($lang: String!) {
    who: prismicWho(lang: {eq: $lang}) {
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
        title
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