/* global tw */
import React from 'react'
import styled from 'react-emotion'

import IconNext from '../../assets/icon-next.svg'
import IconNextBlack from '../../assets/icon-next-black.svg'
import {
  compose,
  find,
  map,
  merge,
  pick,
  path,
  propEq,
  uuid,
  unless,
  isNil,
} from '../../helpers'
import { Container, PrevNextLinkImage, PrevNextTemplate } from '../elements'

const GridRow = styled('div')`
  ${tw([
    'flex',
    'flex-col',
    'screen:flex-row',
    'screen:-mx-q12',
    'screen:justify-center',
    'mt-q24',
    'md:mt-q40',
  ])};
`

const LinkWrapper = styled('div')`
  ${tw(['mb-q24', 'w-full', 'screen:px-q12', 'screen:w-1/2', 'desktop:w-1/3'])};
  height: 20rem;
  @media (min-width: 601px) {
    max-width: calc(1 / 2 * 100% - 1.5rem);
  }
  @media (min-width: 1200px) {
    max-width: calc(1 / 3 * 100% - 1.5rem);
  }
`

const NavContainer = styled('div')`
  ${tw([
    'absolute',
    'flex',
    'justify-between',
    'items-center',
    'px-q32',
    'md:px-1/12',
    'desktop:px-1/6',
  ])};
  ${({ previous }) => (previous ? tw(['pin-l']) : tw(['pin-r']))};
  top: calc(50% - 1.125rem);
  @media (min-width: 1200px) {
    left: ${({ previous }) => (previous ? '-50%' : 'inherit')};
    right: ${({ previous }) => (previous ? 'inherit' : '-50%')};
  }
`

const NextButton = styled(PrevNextTemplate)`
  ${tw(['desktop:hover:bg-black'])};
  background-image: url(${IconNextBlack});
  @media (min-width: 1200px) {
    &:hover {
      background-image: url(${IconNext});
    }
  }
`

const PreviousButton = styled(NextButton)`
  transform: rotateZ(180deg);
`

export const Context = ({ allworks, context }) => {
  const linkUid = path(['link', 'document', 0, 'uid'])
  const getWorkData = uid =>
    compose(
      pick(['title', 'statement']),
      path(['data']),
      find(propEq('uid', uid)),
      map(path(['node'])),
      path(['edges'])
    )(allworks)

  return (
    <Container>
      <GridRow key={uuid()}>
        {unless(isNil, () =>
          context.map((link, i) => (
            <LinkWrapper key={uuid()}>
              <PrevNextLinkImage
                key={uuid()}
                {...merge(link, getWorkData(linkUid(link)))}
              >
                <NavContainer previous={i === 0}>
                  {i === 0 ? <PreviousButton /> : <NextButton />}
                </NavContainer>
              </PrevNextLinkImage>
            </LinkWrapper>
          ))
        )(context)}
      </GridRow>
    </Container>
  )
}
