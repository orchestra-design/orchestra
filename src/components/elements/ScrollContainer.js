/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { compose, lifecycle, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { 
  changeTheme, collapseMenu, setBackSlider,
  setImage, setRightImage, setSicGrid, srollMenu 
} from '../../actions'

import {
  and, camelCase, equals, F, gt,
  head, ifElse, isNil, lt, not, 
  notIsNil, offset, pathOr, path
} from '../../helpers'

const ScrollWrapper = styled('div')`
  ${tw([
    'fixed', 'pin', 
    'overflow-y-scroll'
  ])};
  overflow-x: hidden;
`

const enhance = compose(
  connect(
    ({ 
      backImage, backSlider, collapsedMenu,
      hiddenMenu, rightImage, sicgrid,storedTheme 
    }) => ({ 
      backImage, backSlider, collapsedMenu,
      hiddenMenu, rightImage, sicgrid,storedTheme 
    }),
    { 
      changeTheme, collapseMenu, setBackSlider,
      setImage, setRightImage, setSicGrid, srollMenu 
    }
  ),
  withHandlers({
    scroll: props => event => {
      const scrollChildren = Array.from(event.target.children)
      not(isNil(scrollChildren)) && scrollChildren.map((child, i) => {
        /* CHILD DESAPPEARING */
        const childrenDesappearing = child => {
          const grandchildren = Array.from(child.children)
          grandchildren.map(child => {
            if(child.children.length === 0) {
              const { top, height } = offset(child)
              child.style.opacity = 
                (top + height) > 0 && (top + height) < 100 
                ? (top + height) / 100
                : (top + height) < height
                ? (top + height) / height
                : ''
            } else {
              childrenDesappearing(child)
            }
            return F
          })
          return F
        }
        childrenDesappearing(child)

        /* THEME CHANGING WHEN SCROLLING */
        const childOffset = offset(child)
        const newImage = pathOr(null, ['attributes', 'image', 'value'], child)
        const newRightImage = pathOr(null, ['attributes', 'right-image', 'value'], child)
        const newSicGrid = pathOr(null, ['attributes', 'sicgrid', 'value'], child)
        const isSlider = equals('true', path(['attributes', 'slider', 'value'], child))
        const newTheme = camelCase(child.attributes.theme.value)
        
        // Image
        ifElse(
          ({ top, height }) => and(lt(top, 801), gt((top + height), -400)),
          () => and(
              notIsNil(newImage),
              not(equals(newImage, props.backImage))
            ) && props.setImage(newImage),
            F
          )(childOffset)
          // RightImage Appearing     
          ifElse(
            ({ top, height }) => and(lt(top, 301), gt((top + height), 300)),
            () => {
              and(
                notIsNil(newRightImage),
                not(equals(newRightImage, props.rightImage))
              ) && props.setRightImage(newRightImage)
              and(
                notIsNil(newSicGrid),
                not(equals(newSicGrid, props.sicgrid))
              ) && props.setSicGrid(newSicGrid)
            },
            F
          )(childOffset)
          // RightImage Desappearing     
          ifElse(          
            ({ top, height }) => and(lt(top, 301), gt((top + height), 300)),
            () => and(
              isNil(newRightImage),
              notIsNil(props.rightImage)
            ) && props.setRightImage(null),
          F
        )(childOffset)
        // Theme
        ifElse(
          ({ top, height }) => and(lt(top, 301), gt((top + height), 300)),
          () => {
            not(equals(newTheme, props.storedTheme)) && 
            props.changeTheme(newTheme)
            not(equals(isSlider, props.backSlider)) && 
              props.setBackSlider(isSlider)
          },
          F
        )(childOffset)
        // Menu
        equals(i, 0) && ifElse(
          ({ top }) => lt(top, -400),
          () => !props.hiddenMenu && props.srollMenu(true),
          () => props.hiddenMenu && props.srollMenu(false)
        )(childOffset)
        // Collapsed Menu
        equals(i, 1) && ifElse(
          ({ top }) => lt(top, -200),
          () => !props.collapsedMenu && props.collapseMenu(true),
          () => props.collapsedMenu && props.collapseMenu(false)
        )(childOffset)        
        return F
      }) 
    }
  }),
  lifecycle({
    state: { theme: 'white' },
    componentDidMount() {
      const scrollChildren = Array.from(
        document.getElementById('scroll-container').children     
      )
      this.props.changeTheme(
        camelCase(pathOr('white', ['attributes', 'theme', 'value'], head(scrollChildren)))
      )
      this.props.setImage(
        pathOr(null, ['attributes', 'image', 'value'], head(scrollChildren))
      )
    }
  })
)

export const ScrollContainer = enhance(({ children, scroll }) => (
  <ScrollWrapper id='scroll-container' onScroll={scroll} >
  { children }
  </ScrollWrapper>
))