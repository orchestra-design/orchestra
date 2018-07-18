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

import { ButtonText, Container, Row } from '../elements'

const AllWorksButton = styled('span')`
  ${ButtonText};
  ${tw([
    'cursor-pointer',
    'flex', 'justify-center', 'items-center', 
    'no-underline', 'text-white', 'hover:text-black',
    'bg-black', 'hover:bg-white',
    'shadow-none', 'hover:shadow-elevate1',
    'active:shadow-elevate0', 'focus:shadow-elevate0'
  ])};
  ${tw(['mr-q24'])};
  color: ${({ worksFilter }) => worksFilter === null && 'red'};
  span {
    display: inline-flex;
    width: 100%;
  }
`

const FilterList = styled('div')`
  ${({worksFiltersOpen}) => worksFiltersOpen
  ? tw(['flex', 'flex-col'])
  : tw(['hidden'])
  };
`

const Filters = styled('div')`
  ${Row};
  ${tw([''])};
`

const FilterOpener = styled('span')`
  ${ButtonText};
  ${tw([''])};
`

const FilterButton = styled('span')`
  ${ButtonText};
  ${tw(['cursor-pointer', 'mr-q12'])};
  color: ${({filter, worksFilter}) => 
    filter === worksFilter && 'red'};
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
        event.target.attributes.reset.value === 'true'
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

export const WorksFilter = enhance(({ 
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
      <Row>
        <AllWorksButton {...{worksFilter}}>
          <span
            onClick={setFilter}
            reset="true"
          >Все проекты</span>
        </AllWorksButton>
        <Filters>
          <FilterOpener
            onClick={toggleFilters}
            {...{worksFiltersOpen}}
          >
          { worksFilter !== null ? worksFilter : 'Что делали' }
          </FilterOpener>
          <FilterList {...{worksFiltersOpen}}>
          {allFilters.map(filter => (
            <FilterButton key={uuid()}
              {...{filter}}
              {...{worksFilter}}
            >
              <span key={uuid()}
                onClick={setFilter}
                reset="false"
              >{ filter }</span>
            </FilterButton>
          ))}
          </FilterList>
        </Filters>
      </Row>
    </Container>
  )
})