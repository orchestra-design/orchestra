/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { compose, lifecycle, pure } from 'recompose'
import { connect } from 'react-redux'

import { countJumbo, setImage } from '../../actions'

import {
  and, equals, gt, lt, length,not, 
  notIsNil, offset, safeMap, uuid
} from '../../helpers'

const Dummy = styled('div')`
  ${tw(['hidden', 'screen:block'])}; 
  height: calc(100vh / 2);
`

const enhance = compose(
  connect(
    ({ backImage, jumboCount }) => ({ backImage, jumboCount }),
    { countJumbo, setImage }
  ),
  pure,
  lifecycle({
    updateState() {
      const jumboCounter = document.getElementById('jumbo-counter')
      const jumboCounterChildren = Array.from(jumboCounter.children)
      jumboCounterChildren.map((child, i) => {
        const { top, height } = offset(child)
        and(lt(top, 200), gt((top + height), 200)) && 
          not(equals(this.props.jumboCount, i)) && this.props.countJumbo(i)
        and(equals(i, length(jumboCounterChildren) - 2), lt((top + height), -200)) && 
          this.props.countJumbo(null)
        return null
      })

      // setImage
      const newImage = notIsNil(this.props.jumboCount) &&
        JSON.stringify(this.props.jumbo[this.props.jumboCount].jumboimage)
      and(
        notIsNil(this.props.jumboCount),
        not(equals(newImage, this.props.backImage))
      ) && this.props.setImage(newImage)
    },
    componentDidMount() {
      document.getElementById('scroll-container')
        .addEventListener('scroll', this.updateState.bind(this))
    },  
    componentWillUnmount() {
      document.getElementById('scroll-container')
          .removeEventListener('scroll', this.updateState.bind(this))
    },
  })
)

export const JumboDummy = enhance(({ jumbo }) => 
  <div id="jumbo-counter">
  {safeMap(() => 
    <Dummy key={uuid()} />
  , jumbo)}
  </div>
)