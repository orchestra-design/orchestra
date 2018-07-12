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
    'w-full', 'md:w-auto',
    'p-q36',
  ])};
  ${props => props.isMenu && 
    tw(['flex', 'flex-1', 'w-auto'])
  };
`

export const HeaderNavigation = connect(
  ({ isMenu }) => ({ isMenu }),
)(props => {
  const headerlinks = pathOr(
    false, 
    ['links', 'data', 'headerlinks'], 
    props
  )
  return (
    <Navigaton isMenu={props.isMenu} >
      {headerlinks && map(link => 
        <NavLink key={uuid()}  {...link} />
      )(headerlinks)}
      <LangSwitcher {...props} />
    </Navigaton>
  )
})
