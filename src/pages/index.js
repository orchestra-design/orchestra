import React from 'react'
import { replace } from 'gatsby-link'
import { lifecycle } from 'recompose'

const withLifecicle = lifecycle({
  state: { lang: 'ru' },
  componentDidMount() {
    const language = window.navigator.userLanguage || window.navigator.language
    language.includes('en') && replace('/en')
    language.includes('ru') && replace('/ru')
  }
})

const Index = withLifecicle(() => <div />)

export default Index
