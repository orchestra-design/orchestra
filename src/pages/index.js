/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'

const dynamicStyle = props =>
  css`
    background-image: url(${props.src});
  `

const Page = styled('div')`
  ${tw('flex justify-center items-center absolute pin bg-grey-light bg-center bg-cover bg-no-repeat')};
  ${dynamicStyle};
`

const TextContainer = styled('div')`
  ${tw('text-center sm:flex-grow font-bold text-white')};
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: calc(18px + 36 * ((100vw - 320px) / 1280));
  text-shadow: 0px 0px 24px rgba(0, 0, 0, 1);
`

export default ({ data: { ru: { data } } }) => (
  <Page src={data.slider[0].image.url}>
    <TextContainer>
    { data.underconstruction.text }
    </TextContainer>
  </Page>
)

export const query = graphql`
  query IndexRuQuery {
    ru: prismicHomepage(type: {eq: "homepage"}, lang: {eq: "ru"}) {
      data {
        title {
          text
        }
        underconstruction {
          text 
        }
        email {
          url
        }
        slider {
          image {
            url
          }
          caption
        }
      }
    }
  }
`