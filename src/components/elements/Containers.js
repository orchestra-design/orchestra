/* global tw */
import styled from 'react-emotion'

export const Container = styled('div')`
  ${tw([
    'mx-auto', 'max-w-desktop',
    'px-1/12', 'screen:px-1/47',
  ])};
`

export const ContainerFluid = styled('div')`
  ${tw([
    'flex', 'flex-row', 'justify-center',
    'items-center', 'w-full'
  ])};
`
