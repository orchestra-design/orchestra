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
  ${({ collapsedMenu, isMenu }) => collapsedMenu && !isMenu &&
    tw(['screen:h-q36', 'screen:w-q36', 'screen:text-sm'])
  };
`

const SwitcherLink = SwitcherButton.withComponent(Link)

const reverseLang = ifElse(
  equals('ru'), () => 'en', () => 'ru'
)

export const LangSwitcher = connect(
  ({ collapsedMenu, isMenu }) => ({ collapsedMenu, isMenu }),
  { toggleMenu }
)(({ lang, allSite, path, collapsedMenu, isMenu, toggleMenu }) => {
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
      {...{collapsedMenu}}
      {...{isMenu}}
    >{ reverseLang(lang) }</SwitcherLink>
  )
})