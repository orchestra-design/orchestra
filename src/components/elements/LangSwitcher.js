import React from 'react'
import Link, { withPrefix } from 'gatsby-link'

import { 
  any, compose, equals, ifElse, lensPath, 
  map, replace, view 
} from '../../helpers'

import { SquareButton } from '../elements'

const SwitcherLink = SquareButton.withComponent(Link)

const reverseLang = ifElse(
  equals('ru'), () => 'en', () => 'ru'
)

export const LangSwitcher = ({ lang, allSite, path }) => {
  const makePath = `${withPrefix(reverseLang(lang))}${path.replace(/^\/.{2}/i, '')}`
  const safePath = compose(
    ifElse(
      any(equals(makePath)), 
      () => makePath, 
      () => `/${reverseLang(lang)}`
    ),
    map(replace(/\/$/, '')),
    map(view(lensPath(['node', 'path']))),
  )

  return (
    <SwitcherLink 
      to={safePath(allSite.edges)} 
    >{ reverseLang(lang) }</SwitcherLink>
  )
}