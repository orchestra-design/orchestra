/* global tw */
import React from 'react'
import styled from 'react-emotion'
import { compose, lifecycle, pure } from 'recompose'
import { connect } from 'react-redux'

import { countJumbo } from '../../actions'

import {
  and,
  equals,
  gt,
  isNil,
  lt,
  length,
  not,
  safeMap,
  uuid,
  pick,
} from '../../helpers'

const DummyWrapper = styled('div')`
  margin-bottom: ${({ jumboCount }) => (isNil(jumboCount) ? '3rem' : '100vh')};
`

const Dummy = styled('div')`
  ${tw(['hidden', 'screen:block'])};
  height: calc(100vh / 2);
`

const enhance = compose(
  connect(
    pick(['jumboCount']),
    { countJumbo }
  ),
  pure,
  lifecycle({
    updateState() {
      const jumboCounter = document.getElementById('jumbo-counter')
      if (jumboCounter) {
        const jumboCounterChildren = Array.from(jumboCounter.children)
        jumboCounterChildren.map((child, i) => {
          const { top, height } = child.getBoundingClientRect()
          and(lt(top, 400), gt(top + height, 400)) &&
            not(equals(this.props.jumboCount, i)) &&
            this.props.countJumbo(i)
          and(
            equals(i, length(jumboCounterChildren) - 2),
            lt(top + height, -400)
          ) && this.props.countJumbo(null)
          return null
        })
      }
    },
    componentDidMount() {
      window.addEventListener('scroll', this.updateState.bind(this))
    },
    componentWillUnmount() {
      window.removeEventListener('scroll', this.updateState.bind(this))
    },
  })
)

export const JumboDummy = enhance(({ jumbo, jumboCount }) => (
  <DummyWrapper id="jumbo-counter" {...{ jumboCount }}>
    {safeMap(
      () => (
        <Dummy key={uuid()} />
      ),
      jumbo
    )}
  </DummyWrapper>
))
