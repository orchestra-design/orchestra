import React from 'react'
import Link from 'gatsby-link'

import { 
  concat, startCase, ifElse, includes, curry,
  pick, keysIn, compose, map, values, assoc, objOf, safeMap, uuid
} from '../../helpers'

export const Tags = ({ data, lang, tags }) => {
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
    <div>
    {safeMap(({ tagtitle, tagdescription}) => 
      <div key={uuid()}>
        <span key={uuid()}>{ tagtitle }</span>
        <span key={uuid()}>{ tagdescription }</span>
      </div>
    )(allTags)}
    {safeMap(tag => 
      <div key={uuid()}>
        <Link key={uuid()}
          to={`/${lang}/projects?filter=${tag}`}
        >{ tag }</Link>
      </div>
    )(tags)}
    </div>
  )
}
