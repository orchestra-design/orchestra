import React, { Fragment } from 'react'

import { Header } from '../blocks'
import { SEO } from '../elements'

const TemplateWrapper = ({ site: { data }, lang, children }) => {  
  return (
    <Fragment>
      <SEO
        siteUrl={data.siteurl}
        uid={data.uid || null}
        title={data.sitetitle}
        description={data.sitedescription}
        keywords={data.sitekeywords}
        image={data.siteimage.localFile.childImageSharp.resolutions.src}
        fbAppID=''
      />
      <Header {...{lang}} />
      { children }
    </Fragment>
  )  
}

export default TemplateWrapper
