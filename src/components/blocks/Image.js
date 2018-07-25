/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import Img from 'gatsby-image'

import { 
  Container  
} from '../elements'

import { 
  isNil, unless
} from '../../helpers'

export const Image = ({ items }) => (
  <Container>
    {unless(isNil, () =>
      <div
        className={css`${tw('my-q112 w-full')}`}
      ><Img 
        sizes={items[0].imgimage.localFile.childImageSharp.sizes}
      /></div>
    )(items && items[0].imgimage.localFile)}
  </Container>
)
