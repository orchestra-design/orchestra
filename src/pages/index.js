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

const Container = styled('div')`
  ${tw(
    'bg-white container my-8 mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden font-sans'
  )};
`

const Wrapper = styled('div')`
  ${tw('sm:flex sm:items-center px-6 py-4')};
`

const TextContainer = styled('div')`
  ${tw('text-center sm:text-left sm:flex-grow')};
`


export default ({ data: { homepage: { data } } }) => (
  <Page src={data.body[0].items[0].gallery_image.url}>
    <Container>
      <Wrapper>
        <TextContainer>
        { data.underconstruction.text }
        </TextContainer>
      </Wrapper>
      {console.log(data.body[0].items[0].gallery_image.localFile.absolutePath)}
    </Container>
  </Page>
)

export const query = graphql`
  query IndexRuQuery {
    homepage: prismicHomepage(type: {eq: "homepage"}, lang: {eq: "ru"}) {
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
        body {
          items {
            gallery_image {
              url
              localFile {
                absolutePath
                relativePath
              }
            }
            image_captions {
              text
            }
          }
        }
      }
    }
  }
`