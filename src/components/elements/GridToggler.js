/* global tw */
import React from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'

import { toggleGrid } from '../../actions'
import { SquareButton } from './Buttons'

import IconGrid from '../../assets/icon-grid.svg'
import IconGridBlack from '../../assets/icon-grid-black.svg'
import IconList from '../../assets/icon-list.svg'
import IconListBlack from '../../assets/icon-list-black.svg'

const GridButton = styled(SquareButton)`
  ${tw([
    'hidden', 'md:flex', 
    'bg-center', 'bg-no-repeat',
    'cursor-pointer', 'm-q24'
  ])};
  background-image: url(${({worksGrid}) => worksGrid ? IconList : IconGrid});
  transition: all .2s ease-in-out;
  &:hover {
    background-image: url(${({worksGrid}) => worksGrid ? IconListBlack : IconGridBlack});
  }
`
export const GridToggler = connect(
  ({ worksGrid }) => ({ worksGrid }),
  { toggleGrid }
)(({ toggleGrid, worksGrid}) => 
  <GridButton 
    onClick={() => toggleGrid()}
    {...{worksGrid}} 
  />)
