/* global tw */
import React from 'react'
import styled from 'react-emotion'

import {
  ContainerFluid, Logo, SquareButton
} from '../elements'

const HeaderContainer = styled(ContainerFluid)`
  ${tw('fixed pin-t pin-r pin-l')};
`

const LangSwitcher = styled(SquareButton)`
  ${tw('absolute pin-r pin-t')};
`

export const Header = () => (
  <HeaderContainer>
    <Logo primaryColor="#ffffff" />
    <LangSwitcher >{ 'en' }</LangSwitcher>
  </HeaderContainer>
)