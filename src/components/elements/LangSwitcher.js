/* global tw */
import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import styled from 'react-emotion'

import { 
  any, compose, equals, lensPath, 
  map, replace, view 
} from '../../helpers'

import { SquareButton } from '../elements'

const SwitcherButton = styled(SquareButton)`
  ${tw('absolute pin-r pin-t')};
`

const reverseLang = lang =>
  lang === 'ru' ? 'en' : 'ru'

export const LangSwitcher = ({ lang, allSite, path }) => {
  const makePath = `${withPrefix(reverseLang(lang))}${path.replace(/^\/.{2}/i, '')}`
  const safePath = compose(
    any(equals(makePath)),
    map(replace(/\/$/, '')),
    map(view(lensPath(['node', 'path']))),
  )(allSite.edges)

  return (
    <Link to={safePath ? makePath : `/${reverseLang(lang)}`} >
      <SwitcherButton>{ reverseLang(lang) }</SwitcherButton>
    </Link>
  )
}