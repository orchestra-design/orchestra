import React, { Fragment } from 'react'

import { Header } from '../blocks'

const TemplateWrapper = ({ lang, children }) => {  
  return (
    <Fragment>
    <Header {...{lang}} />
    { children }
    </Fragment>
  )  
}

export default TemplateWrapper
