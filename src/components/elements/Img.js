/* global tw */
import React from 'react'
import { css } from 'react-emotion'
import GatsbyImage from 'gatsby-image'
import { withStateHandlers } from 'recompose';

import { F, ifElse, isNil, pathOr } from '../../helpers'

const imageFixed = pathOr(null, ['localFile', 'childImageSharp', 'fixed'])

const imageFluid = pathOr(null, ['localFile', 'childImageSharp', 'fluid'])

const safeUrl = pathOr(null, ['url'])

export const Img = withStateHandlers(
  ({ initialColor = 'rgba(0, 0, 0, 1)' }) => ({
    backgroundColor: initialColor,
  }),
  {
    onLoad: () => () => ({
      backgroundColor: 'rgba(0, 0, 0, 0)',
    }),
  }
)(({ backgroundColor, onLoad, src, ...props }) => (
  <>
    {ifElse(
      isNil,
      () =>
        ifElse(isNil, F, () => (
          <img
            alt=""
            className={css`
              ${tw(['w-full'])};
            `}
            src={safeUrl(src)}
          />
        ))(safeUrl(src)),
      () =>
        ifElse(
          isNil,
          () => <GatsbyImage
            fixed={imageFixed(src)}
            {...{ onLoad }}
            {...{ backgroundColor }}
            fadeIn
            {...props}
          />,
          () => <GatsbyImage
            fluid={imageFluid(src)}
            {...{ onLoad }}
            {...{ backgroundColor }}
            fadeIn
            {...props}
          />
        )(imageFluid(src))
    )(pathOr(null, ['localFile', 'childImageSharp'], src))}
  </>
))
