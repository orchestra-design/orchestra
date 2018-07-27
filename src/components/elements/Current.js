/* global tw */
import styled from 'react-emotion'

export const Current = styled('span')`
    ${tw([
      'mr-q8', 'pr-q12', 'relative'
    ])}
  &::after {
    content: '';
    ${tw([
      'absolute', 'block', 
      'h-q4', 'pin-r', 'pin-t', 'w-q4'
    ])};
    background: ${({ theme }) => theme.color};
    top: 0.5rem;
  }
`