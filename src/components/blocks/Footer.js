/* global tw */
import React from 'react'
import styled from 'react-emotion'

import { Logo, Container } from '../elements'

const FooterContainer = styled('div')`
  ${tw(['w-full'])};
  color: ${props => props.theme.color};
  min-height: calc(100vh - 250px);
`

const LogoWrapper = styled('div')`
  ${tw(['mt-q200'])};
  height: 69px;
  width: 186px;
`

export const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <LogoWrapper><Logo /></LogoWrapper>
      </Container>
    </FooterContainer>
  )
}