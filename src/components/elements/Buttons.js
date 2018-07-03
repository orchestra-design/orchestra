/* global tw */
import styled, { css } from 'react-emotion'

const Button = css`
  ${tw('flex justify-center align-center m-6 cursor-pointer no-underline text-white hover:text-black hover:bg-white shadow-none hover:shadow-md z-50')};
  background-color: #000000;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: calc(12px + 4 * ((100vw - 320px) / 1280));
  font-variant-caps: all-small-caps;
  transition: all .2s ease-in-out;
  white-space: nowrap;
`

const SquareButton = styled('span')`
  ${Button};
  padding: 1rem;
`

export {
  Button, SquareButton
}