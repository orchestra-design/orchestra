import React from 'react'
import { navigate } from 'gatsby'
import { lifecycle } from 'recompose'

const withLifecicle = lifecycle({
  state: { lang: 'ru' },
  componentDidMount() {
    /* const language = window.navigator.userLanguage || window.navigator.language
    language.includes('en') && replace('/en')
    language.includes('ru') && */

    navigate('/ru')
  },
})

const Index = withLifecicle(() => <div />)

export default Index
