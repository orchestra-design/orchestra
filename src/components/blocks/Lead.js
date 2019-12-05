/* global tw */
import React from 'react'
import styled from 'react-emotion'

import { Container, LeadText } from '../elements'
import { and } from '../../helpers'

const LeadWrapper = styled('div')`
  ${LeadText};
  ${tw([
    'font-semibold',
    'flex',
    'flex-col',
    'justify-center',
    'screen:ml-1/12',
    'my-q48',
  ])};
  ${({ hasImage }) => and(hasImage, tw(['min-h-screen']))};
  color: ${({ theme }) => theme.color};
  text-shadow: ${({ hasImage }) =>
    and(hasImage, '0 0 1.5rem rgba(0,0,0,0.24)')};
  & strong {
    ${tw(['font-extrabold'])};
  }
`

export const Lead = ({ primary }) => (
  <Container>
    <LeadWrapper
      hasImage={primary.leadimage && primary.leadimage.localFile}
      dangerouslySetInnerHTML={{ __html: primary.leadtext.html }}
    />
  </Container>
)
