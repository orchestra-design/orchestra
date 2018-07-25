/* global tw */
import React from 'react'
import styled from 'react-emotion'

import { Container, LeadText } from '../elements'
import { and, not } from '../../helpers'


const LeadWrapper = styled('div')`
  ${LeadText};
  ${tw([
    'screen:ml-1/12', 'py-q112'
  ])};
  ${({ hasImage }) => and(not(hasImage), tw(['my-q200']))};
  color: ${({ theme }) => theme.color};  
  text-shadow: ${({ hasImage }) => and(not(hasImage), '0 0 1.5rem rgba(0,0,0,0.24)')};
`

export const Lead = ({ primary }) => (
  <Container>
    <LeadWrapper hasImage={primary.leadimage && primary.leadimage.localFile && !primary.leadimage}>
    { primary.leadtext.text }
    </LeadWrapper>
  </Container>
)
