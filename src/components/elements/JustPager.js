/* global tw */
import React from 'react'
import styled from 'react-emotion'

import { Current } from './Current'
import { SimpleRow } from './Grids'
import { ButtonText } from './Typography'

const PagerRow = styled('div')`
  ${SimpleRow};
  ${ButtonText};
  ${tw([
    'flex',
    'items-center',
    '-mt-q12',
    'md:mt-q4',
    'relative',
    'whitespace-no-wrap',
  ])};
  color: ${({ theme }) => theme.color};
  line-height: 1.15rem;
`

export const JustPager = ({ count, length }) => (
  <PagerRow>
    <Current>{count + 1}</Current>
    {length}
  </PagerRow>
)
