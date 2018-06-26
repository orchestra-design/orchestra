/* global tw */
import React from 'react';
import styled from 'react-emotion';

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


export default () => (
  <Page>
    <Container>
      <Wrapper>
        <TextContainer>
          Our site is under construction
        </TextContainer>
      </Wrapper>
    </Container>
  </Page>
);
