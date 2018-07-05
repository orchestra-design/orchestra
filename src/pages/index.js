import React, { Fragment } from 'react'
import { push } from 'gatsby-link'
import { lifecycle } from 'recompose'

const withLifecicle = lifecycle({
  state: { lang: 'ru' },
  componentDidMount() {
    const language = window.navigator.userLanguage || window.navigator.language
    language.includes('en') && push('/en')
    language.includes('ru') && push('/ru')
  }
})

export default withLifecicle(() => <Fragment />)
