/* global tw */
import React from 'react'
import { css } from 'react-emotion'

import {
  constant,
  F,
  isNil,
  pathOr,
  unless,
} from '../../helpers'

import { Img } from './Img'

export const Map = ({ map }) => {
  const safeImage = unless(
    isNil,
    pathOr(false, ['localFile'], map) ? constant(map) : F
  )(map)

  if (!safeImage) return null

  return (
    <Img
      className={css`
        ${tw('w-full')};
      `}
      src={safeImage}
    />
  )
}
