/* global tw */
import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { pageTransition } from '../../actions'

import { 
  any, compose, equals, ifElse, lensPath, 
  lengthLte, map, replace, view 
} from '../../helpers'

import { SquareButton } from './Buttons'

const SwitcherButton = styled(SquareButton)`
  ${tw([
    'self-start', 'border-white', 'border', 
    'border-solid', 'md:border-none',
    'mr-0', 'md:mr-q24'
  ])};
  ${({ collapsedMenu, collapseTransition }) => !collapsedMenu  && !collapseTransition && 
    tw(['screen:h-q48', 'screen:w-q48', 'md:mr-q36', 'screen:text-lg'])
  };
  ${({ isMenu }) => isMenu &&
    tw([
      'absolute', 'md:relative', 'screen:h-q48', 'screen:w-q48', 
      'screen:text-lg', 'm-0', 'self-start'
    ])
  };
  ${({ collapsedMenu, isMenu }) => collapsedMenu && !isMenu &&
    tw(['screen:h-q36', 'screen:w-q36', 'screen:text-sm', 'md:mr-q24'])
  };
`

const reverseLang = ifElse(
  equals('ru'), () => 'en', () => 'ru'
)

export const LangSwitcher = connect(
  ({ 
    collapsedMenu, collapseTransition, isMenu 
  }) => ({ 
    collapsedMenu, collapseTransition, isMenu 
  }),
  { pageTransition }
)(({ 
  lang, allSite, path, collapsedMenu, 
  collapseTransition, isMenu, pageTransition 
}) => {
  const makePath = `${withPrefix(reverseLang(lang))}${path.replace(/^\/.{2}/i, '')}`
  const safePath = compose(
    ifElse(
      any(equals(makePath)), 
      () => makePath, 
      () => `/${reverseLang(lang)}`
    ),
    map(replace(/\/$/, '')),
    map(view(lensPath(['node', 'path']))),
  )(allSite.edges)
  
  return (
    <Link 
      to={safePath}
      onClick={() => lengthLte(3, safePath) && pageTransition()}      
      className={css`${tw('no-underline p-q12')};`}
    >
      <SwitcherButton
        {...{collapsedMenu}}
        {...{collapseTransition}}
        {...{isMenu}}
      >{ reverseLang(lang) }</SwitcherButton>
    </Link>
  )
})