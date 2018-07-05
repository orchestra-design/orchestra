import React, { Fragment } from 'react'
import { push } from 'gatsby-link'
import { lifecycle } from 'recompose'

const withLifecicle = lifecycle({
  state: { lang: 'ru' },
  componentDidMount() {
    const path = window.location.pathname.replace(/\/$/, '')
    const language = window.navigator.userLanguage || window.navigator.language
    language.includes('en') && push(`${path}/en`)
    language.includes('ru') && push(`${path}/ru`)
  }
})

export default withLifecicle(() => <Fragment />)
