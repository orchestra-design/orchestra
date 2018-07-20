/* global tw */
import styled from 'react-emotion'

import { ButtonText } from './Typography'

export const Breadcrumbs = styled('div')`
  ${ButtonText};
  ${tw([
    'mb-q24', 'pl-q4', 'whitespace-no-wrap'
  ])};
  color: ${props => props.theme.color};
`
