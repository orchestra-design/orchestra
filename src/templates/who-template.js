import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import TemplateWrapper from '../components/layouts'

const WhoTemplate = ({ data: { who }}) => {
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
    >
      <div>{who.data.title}</div>
      <div className={css`margin-top: 100px;`} >
      {who.data.headerlinks.map(({link, linktitle}, i) => 
        <a key={i} href={link.url}>{ linktitle }</a>
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
  }
`