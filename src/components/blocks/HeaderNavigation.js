/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'

import { map, pathOr, uuid } from '../../helpers'
import {
  LangSwitcher, NavLink
} from '../elements'

const Navigaton = styled('nav')`
  ${tw([
    'bg-black', 'md:bg-transparent',
    'hidden', 'md:flex', 'flex-no-wrap',
    'flex-col', 'md:flex-row',
    'justify-around', 'items-stretch',
    'w-full', 'md:w-auto', 'p-q24'
  ])};
  @media(max-width: 768px) {
    ${props => props.isMenu && 
      tw(['flex', 'flex-1', 'w-auto'])
    };
  }
  ${({ collapseTransition }) => !collapseTransition && 
    tw(['screen:p-q36'])
  };
  ${({ collapsedMenu, isMenu }) => collapsedMenu && !isMenu &&
    tw(['screen:p-q24'])
  };
`

export const HeaderNavigation = connect(
  ({ collapsedMenu, collapseTransition, isMenu }) => ({ collapsedMenu, collapseTransition, isMenu }),
)(props => {
  const { collapsedMenu, collapseTransition, isMenu } = props
  const headerlinks = pathOr(
    false, 
    ['links', 'data', 'headerlinks'], 
    props
  )
  return (
    <Navigaton 
      {...{collapsedMenu}}
      {...{collapseTransition}}
      {...{isMenu}}
    >
      {headerlinks && map(link => 
        <NavLink key={uuid()}  {...link} />
      )(headerlinks)}
      <LangSwitcher {...props} />
    </Navigaton>
  )
})
