/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import Img from 'gatsby-image'

export const Image = ({ image }) => (
  <Img 
    sizes={image.localFile.childImageSharp.sizes} 
    className={css`${tw('pin')};`} 
    style={{position: 'absolute'}} 
  />
)
