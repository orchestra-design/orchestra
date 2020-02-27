/* global tw */
import React from 'react'
import { css } from 'react-emotion'

import { Container } from '../elements'

export const Video = ({ item }) => {
  if (item.imgvideo && !item.imgvideo.html) {
    return null
  }

  return (
    <div
      className={css`
        ${tw('flex flex-col justify-center my-q36 md:my-q72 relative')};
      `}
    >
      <Container
        className={css`
          ${tw('relative')};
        `}
      >
        <div
          className={css`
            ${tw('relative')};
            height: 64vw;
            @media (min-width: 768px) {
              height: 86vh;
            }
            & iframe {
              ${tw('h-full w-full')};
            }
          `}
          dangerouslySetInnerHTML={{ __html: item.imgvideo.html }}
        />
      </Container>
    </div>
  )
}
