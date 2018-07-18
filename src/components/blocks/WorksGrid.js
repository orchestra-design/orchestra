/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'

import { 
  compose, contains, filter,
  find, identity, ifElse, isNil, map, merge, 
  pick, path, propEq, uuid
} from '../../helpers'
import { LinkImage } from '../elements'

const Container = styled('div')`
  ${({worksGrid}) => worksGrid 
  ? tw(['px-q24']) 
  : tw([
      'mx-auto', 'max-w-desktop',
      'px-1/12', 'screen:px-1/47',
    ])
  };
`

const GridRow = styled('div')`
  ${tw([
    'flex', 'flex-col'
  ])};
  ${({worksGrid}) => worksGrid 
  ? tw([
      'screen:flex-row',
      'flex-wrap', 'screen:-mx-q12'
    ])
   : tw([
     '-mx-0'
   ])
  };
`

const LinkWrapper = styled('div')`
  ${tw([
    'mb-q24', 'w-full'
  ])};
  ${({worksGrid}) => worksGrid 
  ? tw([
      'screen:px-q12', 'screen:w-1/2', 
      'desktop:w-1/3'
    ])
  : tw(['screen:mb-q48', 'desktop:mb-q72'])
  };
  height: 20rem;  
  @media(min-width: 601px) {
    max-width: ${({worksGrid}) => 
      worksGrid && 'calc(1/2 * 100% - 1.5rem)'};
  }
  @media(min-width: 1201px) {
    max-width: ${({worksGrid}) => 
      worksGrid && 'calc(1/3 * 100% - 1.5rem)'};
    height: ${({worksGrid}) => !worksGrid && '25rem'};
  }
`

export const WorksGrid = connect(
  ({ worksFilter, worksGrid }) => ({ worksFilter, worksGrid })
)(({ allworks, worksFilter, worksGrid, worksLinks }) => {
  const linkUid = path(['link', 'document', 0, 'uid']) 
  const getWorkData = uid => compose(
    pick(['title', 'description', 'color']),
    path(['data']),
    find(propEq('uid', uid)),
    map(path(['node'])),
    path(['edges'])
  )(allworks)
  const filteredLinks = ifElse(
    ({worksFilter}) => isNil(worksFilter),
    ({worksLinks}) => identity(worksLinks),
    ({worksFilter, worksLinks, allworks}) => filter(link => contains(
      linkUid(link), 
      map(path(['node', 'uid']))(filter(({ node }) => 
        contains(worksFilter, node.tags)
      )(allworks.edges))
    ))(worksLinks)
  )({worksFilter, worksLinks, allworks})
  
  return (
    <Container {...{worksGrid}} >
      <GridRow key={uuid()} {...{worksGrid}} >
      {filteredLinks.map(link => 
        <LinkWrapper key={uuid()} {...{worksGrid}} >
          <LinkImage key={uuid()} {...{worksGrid}}
            {...merge(link, getWorkData(linkUid(link))) }            
          />
        </LinkWrapper>
      )}
      </GridRow>
    </Container>
  )
})
