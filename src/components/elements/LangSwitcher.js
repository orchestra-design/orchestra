/* global tw */
import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { pageTransition } from '../../actions'

import {
  any,
  compose,
  equals,
  ifElse,
  lensPath,
  lengthLte,
  map,
  replace,
  view,
  constant,
} from '../../helpers'

import { SquareButton } from './Buttons'

const SwitcherButton = styled(SquareButton)`
  ${tw([
    'self-start',
    'border-white',
    'border',
    'border-solid',
    'md:border-none',
    'screen:h-q36',
    'screen:w-q36',
    'screen:text-sm',
    'mr-0',
    'mb-q12',
    'md:mb-0',
    'hover:text-black',
    'hover:bg-white',
  ])};
`

const reverseLang = ifElse(equals('ru'), () => 'en', () => 'ru')

export const LangSwitcher = connect(
  constant,
  { pageTransition }
)(({ lang, allSite, path, collapseTransition }) => {
  const makePath = `${withPrefix(reverseLang(lang))}${path.replace(
    /^\/.{2}/i,
    ''
  )}`
  const safePath = compose(
    ifElse(
      any(equals(makePath)),
      () => makePath,
      () => `/${reverseLang(lang)}`
    ),
    map(replace(/\/$/, '')),
    map(view(lensPath(['node', 'path'])))
  )(allSite.edges)

  return (
    <Link
      to={safePath}
      onClick={() => lengthLte(3, safePath) && pageTransition()}
      className={css`
        ${tw('no-underline p-q12')};
      `}
    >
      <SwitcherButton>{reverseLang(lang)}</SwitcherButton>
    </Link>
  )
})
