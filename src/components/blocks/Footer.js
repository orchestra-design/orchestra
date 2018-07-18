/* global tw */
import React from 'react'
import styled from 'react-emotion'

const FooterContainer = styled('div')`
  ${tw(['w-full'])};
  color: ${props => props.theme.color};
  height: calc(100vh - 250px);
`

export const Footer = () => {
  return (
    <FooterContainer>
    Poop
    </FooterContainer>
  )
}