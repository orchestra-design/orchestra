/* global tw */
import React, { useEffect } from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'
import { useInView } from 'react-intersection-observer'

import {
  changeTheme,
  hideDown,
  itHasBackImage,
  setBackSlider,
  setImage,
  setRightImage,
  setSicGrid,
  thisFooter,
} from '../../actions'

import { camelCase, path, pathOr, pick } from '../../helpers'

const ScrollContainer = styled('div')`
  ${tw(['relative'])};
  overflow-x: hidden;
`

export const ScrollChild = connect(
  pick([
    'backImage',
    'backSlider',
    'hasBackImage',
    'isFooter',
    'rightImage',
    'sicgrid',
    'sliderCounter',
    'storedTheme',
  ]),
  {
    changeTheme,
    hideDown,
    itHasBackImage,
    setBackSlider,
    setImage,
    setRightImage,
    setSicGrid,
    thisFooter,
  }
)(props => {
  const {
    backImage,
    backSlider,
    changeTheme,
    children,
    hasBackImage,
    hideDown,
    isFooter,
    rightImage,
    sicgrid,
    sliderCounter,
    storedTheme,
    itHasBackImage,
    setBackSlider,
    setImage,
    setRightImage,
    setSicGrid,
    thisFooter,
  } = props
  const isFirst = pathOr(false, ['isFirst'], props)
  const hasImage = pathOr(null, ['backimage'], props)
  const newImage = pathOr(
    pathOr(
      null,
      ['items', sliderCounter[pathOr(0, ['sliderId'], props)], 'imgimage'],
      props
    ),
    ['image'],
    props
  )
  const newRightImage = pathOr(null, ['rightImage'], props)
  const newSicGrid = pathOr(null, ['sicgrid'], props)
  const isSlider = path(['slider'], props)
  const newTheme = camelCase(pathOr('white', ['theme'], props))

  const [ref, inView] = useInView({
    threshold: 0.3,
  })
  const [firstRef, firstInView] = useInView({
    threshold: 0.3,
  })

  const action = () => {
    if (inView) {
      if (isSlider !== backSlider) setBackSlider(isSlider)
      if (hasImage !== hasBackImage) itHasBackImage(hasImage)
      if (newSicGrid && newSicGrid !== sicgrid) setSicGrid(newSicGrid)
      if (newRightImage && newRightImage !== rightImage)
        setRightImage(newRightImage)
      if (newImage && newImage !== backImage) setImage(newImage)
      if (newTheme !== storedTheme) changeTheme(newTheme)
    }

    if (isFooter) thisFooter(!inView)
  }

  const firstAction = () => {
    if (firstInView) {
      if (newTheme !== storedTheme) changeTheme(newTheme)
      if (newImage && newImage !== backImage) setImage(newImage)
      if (newRightImage && newRightImage !== rightImage)
        setRightImage(newRightImage)
    }
    hideDown(!firstInView)
  }

  useEffect(action, [inView])
  useEffect(firstAction, [firstInView])

  return (
    <div
      className={css`
        ${tw(['relative'])};
      `}
      ref={isFirst ? firstRef : ref}
    >
      {children}
    </div>
  )
})

export default ScrollContainer
