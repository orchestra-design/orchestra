import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import TemplateWrapper from '../components/layouts'

const WhatTemplate = ({ data: { what }}) => {
  return (
    <TemplateWrapper
     seo={{
        data: {
          uid: what.uid,
          seotitle: what.data.seotitle,
          seodescription: what.data.seodescription,
          seokeywords: what.data.seokeywords,
          seoimage: what.data.seoimage,
        }
      }}
      lang={what.lang} 
    >
      <div>{what.data.title}</div>
      <div className={css`margin-top: 100px;`} >
      {what.data.headerlinks.map(({link, linktitle}, i) => 
        <a key={i} href={link.url}>{ linktitle }</a>
      )}
      </div>
    </TemplateWrapper>
  )
}

export default WhatTemplate

export const query = graphql`
  query WhatTemplateQuery($lang: String!) {
    what: prismicWhat(lang: {eq: $lang}) {
      uid
      lang
      data {
        seotitle
        seodescription
        seokeywords
        seoimage {
          url
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