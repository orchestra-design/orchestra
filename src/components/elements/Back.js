/* global tw */
import styled from 'react-emotion'

export const Back = styled('div')`
  ${tw('fixed pin')}; 
  background-color: ${props => 
    props.theme.backgroundColor || props.color
  };
  transition: all .8s ease-in-out;
`
