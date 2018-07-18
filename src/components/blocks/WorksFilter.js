import React from 'react'
import { connect } from 'react-redux'
import { compose as recompose, withHandlers } from 'recompose'

import { setWorkFilter } from '../../actions'
import { 
  compose, concat, path, 
  map, reduce, uniq, uuid
} from '../../helpers'

const enhance = recompose(
  connect(
    ({ worksFilter }) => ({ worksFilter }),
    { setWorkFilter }
  ),
  withHandlers({
    clickHandler: props => event => {
      props.setWorkFilter(
        event.target.attributes.reset.value === 'true'
        ? null
        : event.target.textContent
      )
    }
  })
)

export const WorksFilter = enhance(({ 
  allworks, clickHandler, worksFilter 
}) => {
  const allFilters = compose(
      uniq,
      reduce(concat, []),
      map(path(['node', 'tags'])),
      path(['edges'])
    )(allworks)
  
  return (
    <div>
      <span
        onClick={clickHandler}
        reset="true"
        style={{
          marginRight: '10px',
          color: worksFilter === null && 'red' 
        }}
      >Все проекты</span>
      {allFilters.map(filter => (
        <span key={uuid()}
          onClick={clickHandler}
          reset="false"
          style={{
            marginRight: '10px',
            color: filter === worksFilter && 'red' 
          }}
        >{ filter }</span>
      ))}
    </div>
  )
})