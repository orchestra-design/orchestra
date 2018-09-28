/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import { Img } from './Img'

export const JustImage = ({ image }) => (
  <Img
    src={image}
    className={css`
      ${tw('pin')};
    `}
    style={{ position: 'absolute' }}
  />
)
