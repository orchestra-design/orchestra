/* global tw */
import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import styled from 'react-emotion'
import { connect } from 'react-redux'

import { toggleMenu } from '../../actions'

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

export const LangSwitcher = connect(
  ({ isMenu }) => ({ isMenu }),
  { toggleMenu }
)(({ lang, allSite, path, isMenu, toggleMenu }) => {
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
      onClick={() => isMenu && toggleMenu()}
    >{ reverseLang(lang) }</SwitcherLink>
  )
})