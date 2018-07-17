/* global tw */
import React from 'react'
import styled from 'react-emotion'

import { 
  compose, find, map, merge, 
  pick, path, propEq, uuid 
} from '../../helpers'
import { LinkImage } from '../elements'

const Container = styled('div')`
  ${tw(['px-q24'])};
`

const GridRow = styled('div')`
  ${tw([
    'flex', 'flex-col', 'screen:flex-row',
    'flex-wrap', 'screen:-mx-q12'
  ])};
`

const LinkWrapper = styled('div')`
  ${tw([
    'screen:px-q12', 'mb-q24',
    'w-full', 'screen:w-1/2', 'desktop:w-1/3'
  ])};
  height: 20rem;
  @media(min-width: 601px) {
    max-width: calc(1/2 * 100% - 1.5rem);
  }
  @media(min-width: 1201px) {
    max-width: calc(1/3 * 100% - 1.5rem);
  }
`

export const WorksGrid = ({ allworks, worksLinks }) => {
  const linkUid = path(['link', 'document', 0, 'uid']) 
  const getWorkData = uid => compose(
    pick(['title', 'description', 'color']),
    path(['data']),
    find(propEq('uid', uid)),
    map(path(['node'])),
    path(['edges'])
  )(allworks)

  return (
    <Container>
      <GridRow key={uuid()} >
      {worksLinks.map(link => 
        <LinkWrapper key={uuid()} >
          <LinkImage key={uuid()}
            {...merge(link, getWorkData(linkUid(link))) }            
          />
        </LinkWrapper>
      )}
      </GridRow>
    </Container>
  )
}
