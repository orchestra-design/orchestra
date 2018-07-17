/* global tw */
import React from 'react'
import styled from 'react-emotion'

import { 
  compose, find, map, merge, 
  pick, path, propEq, splitEvery,
  uuid 
} from '../../helpers'
import { 
  ColumnThree, LinkImage, Row 
} from '../elements'

const Container = styled('div')`
  ${tw(['px-q24'])};
`

const GridRow = styled('div')`
  ${Row};
  ${tw(['md:mb-q24'])};
`

const LinkWrapper = styled('div')`
  ${ColumnThree};
  height: 20rem;
  @media(min-width: 769px) {
    max-width: calc((1/3 - 1/47) * 100%);
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
      {splitEvery(3, worksLinks).map(row => 
        <GridRow>
        {row.map(link => 
          <LinkWrapper key={uuid()} >
            <LinkImage key={uuid()}
              {...merge(link, getWorkData(linkUid(link))) }            
            />
          </LinkWrapper>
        )}
        </GridRow>
      )}
    </Container>
  )
}
