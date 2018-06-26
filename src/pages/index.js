/* global tw */
import React from 'react'
import styled from 'react-emotion'

const Page = styled('div')`
  ${tw('flex justify-center items-center absolute pin bg-grey-light')};
`;

const Container = styled('div')`
  ${tw(
    'bg-white container my-8 mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden font-sans'
  )};
`;

const Wrapper = styled('div')`
  ${tw('sm:flex sm:items-center px-6 py-4')};
`;

const TextContainer = styled('div')`
  ${tw('text-center sm:text-left sm:flex-grow')};
`;


export default ({ data }) => (
  <Page>
    <Container>
      <Wrapper>
        <TextContainer>
        { data.homepage.data.underconstruction.text }
        </TextContainer>
        {console.log(data)}
      </Wrapper>
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