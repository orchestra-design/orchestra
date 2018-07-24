/* global tw */
import React from 'react'
import styled from 'react-emotion'

import { Container } from './Containers'
import { LeadText } from './Typography'


const LeadWrapper = styled('div')`
  ${LeadText};
  ${tw([
    'screen:ml-1/12', 'py-q112'
  ])};
`

export const Lead = ({ text }) => (
  <Container>
    <LeadWrapper>
    { text }
    </LeadWrapper>
  </Container>
)
