/* global tw */
import React from 'react'
import styled from 'react-emotion'

import { Container, LeadText } from '../elements'


const LeadWrapper = styled('div')`
  ${LeadText};
  ${tw([
    'screen:ml-1/12', 'py-q112'
  ])};
  color: ${({ theme }) => theme.color};
`

export const Lead = ({ text }) => (
  <Container>
    <LeadWrapper>
    { text }
    </LeadWrapper>
  </Container>
)
