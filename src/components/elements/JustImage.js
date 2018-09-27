/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import Img from 'gatsby-image'

export const JustImage = ({ image }) => 
  <Img 
    fluid={image.localFile.childImageSharp.fluid} 
    className={css`${tw('pin')};`} 
    style={{position: 'absolute'}} 
  />
