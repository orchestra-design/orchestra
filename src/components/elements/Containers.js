/* global tw */
import styled from 'react-emotion'

export const Container = styled('div')`
  ${tw(['mx-auto', 'max-w-desktop', 'px-q24'])};
  width: calc(100% - 3rem);
`

export const ContainerFluid = styled('div')`
  ${tw(['flex', 'flex-row', 'justify-center', 'items-center', 'w-full'])};
`
