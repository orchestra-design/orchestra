/* global tw */
import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import styled from 'react-emotion'

import { 
  any, compose, equals, ifElse, lensPath, 
  map, replace, view 
} from '../../helpers'

import { SquareButton } from '../elements'

const SwitcherButton = styled(SquareButton)`
  ${tw([
    'self-start', 'border-white', 'border', 
    'border-solid', 'md:border-none'
  ])};
`

const SwitcherLink = SwitcherButton.withComponent(Link)

const reverseLang = ifElse(
  equals('ru'), () => 'en', () => 'ru'
)

export const LangSwitcher = ({ lang, allSite, path, className }) => {
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
      to={safePath(allSite.edges)} {...{className}}
    >{ reverseLang(lang) }</SwitcherLink>
  )
}