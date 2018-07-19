/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { setWorkFilter, toggleWorkFilter } from '../../actions'
import { 
  compose, concat, path, 
  map, reduce, uniq, uuid
} from '../../helpers'

import { 
  Button, GridToggler, 
  SquareButton
} from '../elements'

import IconDown from '../../assets/icon-down.svg'
import IconDownBlack from '../../assets/icon-down-black.svg'

const Container = styled('div')`
  ${tw([    
    'mx-auto', 'max-w-desktop',
    'px-q24'
  ])};
`

const FiltersRow = styled('div')`
  ${tw([
    'flex', 'flex-row', 'flex-wrap',
    'items-center', 'justify-between',
    'mb-q24', 'mt-q72'
  ])};
`

const AllWorksButton = styled('span')`
  ${Button};
  ${tw([
    'h-q36', 'mr-q24', 'mb-q12',
    'px-q12', 'flex-no-shrink'
  ])};
  ${({ worksFilter }) => worksFilter === null 
  ? tw(['bg-black', 'text-white'])
  : tw([
      'bg-white', 'text-black',
      'hover:bg-black', 'hover:text-white',
    ])
  };
  span {
    display: inline-flex;
    width: 100%;
  }
`

const Filters = styled('div')`
  ${tw([
    'flex', 'flex-row',
    'relative'
  ])};
`

const FilterOpener = styled('span')`
  ${Button};
  ${tw([
    'h-q36', 'px-q12',
    'truncate', 'mb-q12',
  ])};
  ${({ worksFilter, worksFiltersOpen }) => 
    worksFilter === null && !worksFiltersOpen &&
      tw([
        'bg-white', 'text-black',
        'hover:bg-black', 'hover:text-white',
      ])};
`

const OpenerIcon = styled(SquareButton)`
  ${tw(['bg-center', 'bg-no-repeat'])};
  ${({ worksFilter, worksFiltersOpen }) => 
    worksFilter === null && !worksFiltersOpen &&
      tw([
        'bg-white', 'text-black', 'mb-q12',
        'hover:bg-black', 'hover:text-white',
      ])};
  transform: rotateZ(${({ worksFiltersOpen }) => worksFiltersOpen ? '180deg' : '0deg'});
  transition-property: background, color, shadow, transform;
  transition-duration: .2s, .2s, .2s, 0s;
  transition-timing-function: ease-in-out;
  background-image: url(${({ worksFilter, worksFiltersOpen }) => worksFilter === null && !worksFiltersOpen ? IconDownBlack : IconDown});  
  &:hover {
    background-image: url(${({ worksFilter, worksFiltersOpen }) => worksFilter === null && !worksFiltersOpen ? IconDown : IconDownBlack});
  }
`

const FilterList = styled('div')`
  ${tw([
    'absolute', 'bg-white', 'flex-col',
    'pin-r', 'md:pin-none', 'md:pin-l', 'pin-t', 
    'mt-q36', 'shadow-elevate1', 'z-40'
  ])}
  ${({worksFiltersOpen}) => worksFiltersOpen
  ? tw(['flex'])
  : tw(['hidden'])
  };
`

const FilterButton = styled('span')`
  ${Button};
  ${tw([
    'bg-black', 'text-white',
    'hover:bg-white', 'hover:text-black',
    'h-q36', 'px-q12', 'flex-no-shrink',
    'whitespace-no-wrap'
  ])};
`

const enhance = compose(
  connect(
    ({ 
      worksFilter, worksFiltersOpen 
    }) => ({ 
      worksFilter, worksFiltersOpen 
    }),
    { setWorkFilter, toggleWorkFilter }
  ),
  withHandlers({
    setFilter: props => event => {
      props.setWorkFilter(
        event.target.className.includes('reset')
        ? null
        : event.target.textContent
      )
      props.worksFiltersOpen && props.toggleWorkFilter()
    },
    toggleFilters: props => () => {
      props.toggleWorkFilter()
    }
  })
)

export const WorksFilters = enhance(({ 
  allworks, setFilter, toggleFilters,
  worksFilter, worksFiltersOpen 
}) => {
  const allFilters = compose(
      uniq,
      reduce(concat, []),
      map(path(['node', 'tags'])),
      path(['edges'])
    )(allworks)
  
  return (
    <Container>
      <FiltersRow>
        <AllWorksButton 
          className="reset"
          onClick={setFilter}
          {...{worksFilter}} 
        >Все проекты</AllWorksButton>
        <Filters>
          <FilterOpener
            onClick={toggleFilters}
            {...{worksFilter}}
            {...{worksFiltersOpen}}
          >
          { worksFilter !== null ? worksFilter : 'Что делали' }
          </FilterOpener>
          <OpenerIcon 
            onClick={toggleFilters}
            {...{worksFilter}}
            {...{worksFiltersOpen}}            
          />
          <FilterList {...{worksFiltersOpen}}>
          {allFilters.map(filter => (
            <FilterButton key={uuid()}
              onClick={setFilter}            
            >{ filter }</FilterButton>
          ))}
          </FilterList>
        </Filters>
        <GridToggler/>
      </FiltersRow>
    </Container>
  )
})