/* global tw */
import React from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux'
import styled, { css } from 'react-emotion'

import { pageTransition } from '../../actions'

import { 
  concat, startCase, ifElse, includes, curry,
  pick, keysIn, compose, map, values, assoc, 
  objOf, safeMap, uuid, constant
} from '../../helpers'

import { Row, ColumnThreeFive, ColumnTwoFive } from './Grids'
import { ButtonSmallText, Description, DescriptionSemibold } from './Typography'
import { BaseTransition } from './Transitions'

const TagsRow = styled('div')`
  ${Row};
  ${Description};
  ${tw(['mt-q72'])};
`

const Line = styled('div')`
  ${tw([
    'flex', 'flex-row',
    'md:-mx-q12', 'mb-q4',
  ])};
`

const Left = styled('div')`
  ${ColumnThreeFive};
  ${tw(['mb-0'])};
`

const Right = styled('div')`
  ${ColumnTwoFive};
  ${tw(['mb-0'])};
`

const LinkStyles = css`
  ${ButtonSmallText};
  ${tw([
    'inline-block', 'mb-q4', 'mr-q4', 
    'no-underline', 'px-q8', 'py-q4', 
    'text-black', 'screen:text-white', 
    'hover:bg-black', 'hover:text-white',
    'shadow-none', 'hover:shadow-elevate1'
  ])};
  ${BaseTransition};
`

export const Tags = connect(
  constant,
  { pageTransition }
)(({ data, lang, pageTransition, tags }) => {
  const translations = { 
    client: 'клиент', 
    location: 'расположение', 
    status: 'статус', 
    timeline: 'Время', 
    type: 'Тип'
  }
  const translateHandler = curry(
    (obj, lang, key) => ifElse(
      () => includes('ru', lang),
      () => startCase(obj[key]),
      () => startCase(key)
    )(lang, obj, key)
  )
  const translate = translateHandler(translations, lang)
  const pickKeys = pick([
    'location', 'type', 'status', 'timeline', 'client'
  ])
  const keysIt = compose(
    map(translate),
    keysIn,
    pickKeys
  )
  const valuesIt = compose(
    values,
    pickKeys
  )
  const allTags = concat(
    keysIt(data).map((key, i) => assoc(
      'tagdescription', valuesIt(data)[i],
      objOf('tagtitle', key)
    )),
    data.customtags
  )
  
  return (
    <TagsRow>
      <Left
        className={css`${tw('mb-q36')}`}
      >
      {safeMap(({ tagtitle, tagdescription}) => 
        <Line key={uuid()}>
          <Right key={uuid()}
            className={css`${tw('screen:text-white')}`}
          >{ tagtitle }</Right>
          <Left key={uuid()}
            className={DescriptionSemibold}
          >{ tagdescription }</Left>
        </Line>
      )(allTags)}
      </Left>
      <Right>
      {safeMap(tag => 
        <Link key={uuid()}
          className={LinkStyles}
          onClick={pageTransition}
          to={`/${lang}/projects?filter=${tag}`}
        >{ tag }</Link>
      )(tags)}    
      </Right>
    </TagsRow>
  )
})
