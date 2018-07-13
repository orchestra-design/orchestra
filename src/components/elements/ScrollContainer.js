/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { compose, lifecycle, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { 
  changeTheme, collapseMenu, srollMenu 
} from '../../actions'

import {
  and, camelCase, equals, F, gt,
  head, ifElse, isNil, lt, not, 
  offset, path
} from '../../helpers'

const ScrollWrapper = styled('div')`
  ${tw([
    'fixed', 'pin', 
    'overflow-y-scroll'
  ])};
`

const enhance = compose(
  connect(
    ({ 
      collapsedMenu, hiddenMenu, storedTheme 
    }) => ({ 
      collapsedMenu, hiddenMenu, storedTheme 
    }),
    { changeTheme, collapseMenu, srollMenu }
  ),
  withHandlers({
    scroll: props => event => {
      const scrollChildren = Array.from(event.target.childNodes)
      not(isNil(scrollChildren)) && scrollChildren.map((child, i) => {
        const childOffset = offset(child)
        const newTheme = camelCase(child.attributes.theme.value)
        ifElse(
          ({ top, height }) => and(lt(top, 0), gt((top + height), 0)),
          () => not(equals(newTheme, props.storedTheme)) && props.changeTheme(newTheme),
          F
        )(childOffset)
        equals(i, 0) && ifElse(
          ({ top }) => lt(top, -400),
          () => not(equals(props.hiddenMenu, true)) && props.srollMenu(true),
          () => not(equals(props.hiddenMenu, false)) && props.srollMenu(false)
        )(childOffset)
        equals(i, 1) && ifElse(
          ({ top }) => lt(top, -200),
          () => not(equals(props.collapsedMenu, true)) && props.collapseMenu(true),
          () => not(equals(props.collapsedMenu, false)) && props.collapseMenu(false)
        )(childOffset)        
        return F
      }) 
    }
  }),
  lifecycle({
    state: { theme: 'white' },
    componentDidMount() {
      const scrollChildren = Array.from(
        document.getElementById('scroll-container').childNodes     
      )
      this.props.changeTheme(
        path(['attributes', 'theme', 'value'], head(scrollChildren))
      )
    }
  })
)

export const ScrollContainer = enhance(({ children, scroll }) => (
  <ScrollWrapper id='scroll-container' onScroll={scroll} >
  { children }
  </ScrollWrapper>
))