/* global tw */
import React from 'react'
import styled from 'react-emotion'

import { Container, LeadText } from '../elements'

const LeadWrapper = styled('div')`
  ${LeadText};
  ${tw(['flex', 'flex-col', 'justify-center',
    'screen:mx-1/6', 'relative',
  ])};
  ${tw(['screen:min-h-screen'])};
  color: ${({ theme }) => theme.color};
  @media (max-width: 599px) {
    height: 100vw;
  }
`

export const FirstScreen = ({ description }) => (
  <Container>
    <LeadWrapper>
    { description.text }
    </LeadWrapper>
  </Container>
)
