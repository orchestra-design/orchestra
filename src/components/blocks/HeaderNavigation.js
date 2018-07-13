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
  ${({ collapseTransition }) => !collapseTransition && 
    tw(['screen:p-q36'])
  };
  ${props => props.isMenu && 
    tw(['flex', 'flex-1', 'flex-wrap', 'p-0', 'screen:p-0'])
  };
  ${({ collapsedMenu, isMenu }) => collapsedMenu && !isMenu &&
    tw(['p-0'])
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
