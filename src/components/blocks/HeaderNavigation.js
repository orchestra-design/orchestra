/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'

import { map, pathOr, uuid, pick } from '../../helpers'
import { ContactButton, LangSwitcher, NavLink } from '../elements'

const Navigaton = styled('nav')`
  ${tw([
    'bg-black',
    'md:bg-transparent',
    'hidden',
    'md:flex',
    'flex-no-wrap',
    'flex-col',
    'md:flex-row',
    'justify-around',
    'items-stretch',
    'w-full',
    'md:w-auto',
    'p-0',
    'pr-q12',
  ])};
  ${props => props.isMenu && tw(['flex', 'flex-1', 'flex-wrap', 'screen:p-0'])};
`

const Contact = ContactButton.withComponent('a')

export const HeaderNavigation = connect(pick(['isMenu']))(props => {
  const { isMenu, location, meta } = props
  const headerlinks = pathOr(false, ['meta', 'data', 'headerlinks'], props)

  return (
    <Navigaton {...{ isMenu }}>
      {headerlinks &&
        map(link => (
          <NavLink
            active={location.pathname.replace(/\/$/, '') === link.link.url}
            key={uuid()}
            {...link}
          />
        ))(headerlinks)}
      <LangSwitcher {...props} />
      {isMenu && (
        <Contact
          href={meta.data.email.url}
          {...{ isMenu }}
          target="_blank"
          rel="noopener noreferrer"
        />
      )}
    </Navigaton>
  )
})
