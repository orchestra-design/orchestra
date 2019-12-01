/* global tw */
import React from 'react'
import styled from 'react-emotion'

import { Container, RichText } from '../elements'

const LeadWrapper = styled('div')`
  ${RichText};
  ${tw([
    'font-semibold',
    'flex',
    'flex-col',
    'justify-center',
    'screen:mx-1/6',
    'relative',
  ])};
  ${tw(['screen:min-h-screen'])};
  color: ${({ theme }) => theme.color};
  @media (max-width: 599px) {
    height: 100vw;
  }
  & strong {
    ${tw(['font-extrabold'])};
  }
`

export const FirstScreen = ({ description }) => (
  <Container>
    <LeadWrapper>
      <div
        dangerouslySetInnerHTML={{
          __html: description.html,
        }}
      />
    </LeadWrapper>
  </Container>
)
