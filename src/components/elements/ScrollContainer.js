/* global tw */
import React, {
  cloneElement,
  Component,
  Children,
  createRef,
  forwardRef,
} from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

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

import {
  and,
  camelCase,
  equals,
  F,
  gt,
  ifElse,
  isNil,
  lt,
  not,
  notIsNil,
  path,
  pathOr,
  pick,
} from '../../helpers'

const ScrollWrapper = styled('div')`
  ${tw(['relative'])};
  overflow-x: hidden;
`

export const ScrollChild = forwardRef(({ children }, ref) => (
  <div
    className={css`
      ${tw(['relative'])};
    `}
    ref={ref}
  >
    {children}
  </div>
))

class ScrollContainer extends Component {
  constructor(props) {
    super(props)
    this.children = Children.map(this.props.children, () => createRef())
  }

  scrollHandler() {
    this.children.map(({ current }, i) => {
      const child = Children.map(
        this.props.children,
        (child, j) => (j === i ? child : null)
      ).map(x => x && x)[0]
      const childOffset =
        current !== null &&
        typeof current.getBoundingClientRect === `function` &&
        current.getBoundingClientRect()
      const hasImage = pathOr(null, ['props', 'backimage'], child)
      const newImage = pathOr(
        pathOr(
          null,
          [
            'props',
            'items',
            this.props.sliderCounter[pathOr(0, ['props', 'sliderId'], child)],
            'imgimage',
          ],
          child
        ),
        ['props', 'image'],
        child
      )
      const newRightImage = pathOr(null, ['props', 'rightImage'], child)
      const newSicGrid = pathOr(null, ['props', 'sicgrid'], child)
      const isSlider = path(['props', 'slider'], child)
      const newTheme = camelCase(pathOr('white', ['props', 'theme'], child))

      // Image
      ifElse(
        ({ top, height }) => and(lt(top, 401), gt(top + height, 400)),
        () =>
          and(
            notIsNil(newImage),
            not(equals(newImage, this.props.backImage))
          ) && this.props.setImage(newImage),
        F
      )(childOffset)
      // RightImage Appearing
      ifElse(
        ({ top, height }) => and(lt(top, 301), gt(top + height, 300)),
        () => {
          and(
            notIsNil(newRightImage),
            not(equals(newRightImage, this.props.rightImage))
          ) && this.props.setRightImage(newRightImage)
          and(
            notIsNil(newSicGrid),
            not(equals(newSicGrid, this.props.sicgrid))
          ) && this.props.setSicGrid(newSicGrid)
        },
        F
      )(childOffset)
      // RightImage Desappearing
      ifElse(
        ({ top, height }) => and(lt(top, 301), gt(top + height, 300)),
        () =>
          and(isNil(newRightImage), notIsNil(this.props.rightImage)) &&
          this.props.setRightImage(null),
        F
      )(childOffset)
      // Theme
      ifElse(
        ({ top, height }) => and(lt(top, 401), gt(top + height, 400)),
        () => {
          not(equals(newTheme, this.props.storedTheme)) &&
            this.props.changeTheme(newTheme)
          not(equals(isSlider, this.props.backSlider)) &&
            this.props.setBackSlider(isSlider)
          not(equals(hasImage, this.props.hasBackImage)) &&
            this.props.itHasBackImage(hasImage)
        },
        F
      )(childOffset)
      // HiddenDown
      if (i === 0) {
        ifElse(
          ({ top }) => and(gt(top, -40), this.props.hiddenDown),
          () => this.props.hideDown(false),
          ifElse(
            ({ top, height }) =>
              and(lt(top + height, 400), not(this.props.hiddenDown)),
            () => this.props.hideDown(true),
            F
          )
        )(childOffset)
      }
      // Footer
      if (i === this.children.length - 1) {
        ifElse(
          ({ top, height }) => and(lt(top, 401), gt(top + height, 400)),
          () => !this.props.isFooter && this.props.thisFooter(true),
          () => this.props.isFooter && this.props.thisFooter(false)
        )(childOffset)
      }
      /* CHILD DESAPPEARING */
      const childrenDesappearing = child => {
        const grandchildren = child !== null && Array.from(child.children)
        grandchildren &&
          grandchildren.map(child => {
            if (child.children.length === 0) {
              const { top, height } = child.getBoundingClientRect()
              child.style.opacity =
                top + height > 0 && top + height < 100
                  ? (top + height) / 100
                  : top + height < height
                    ? (top + height) / height
                    : ''
            } else {
              childrenDesappearing(child)
            }
            return F
          })
        return F
      }
      childrenDesappearing(current)
      return F
    })
  }

  componentDidMount() {
    if (typeof window !== `undefined`) {
      window.addEventListener('scroll', this.scrollHandler.bind(this))
    }

    this.props.changeTheme(
      camelCase(
        pathOr(
          'white',
          ['props', 'theme'],
          Children.only(this.props.children[0])
        )
      )
    )

    this.props.setImage(
      pathOr(null, ['props', 'image'], Children.only(this.props.children[0]))
    )

    this.props.setRightImage(
      pathOr(null, ['props', 'rightImage'], Children.only(this.props.children[0]))
    )
  }

  componentWillUnmount() {
    if (typeof window !== `undefined`) {
      window.removeEventListener('scroll', this.scrollHandler.bind(this))
    }
  }

  render() {
    return (
      <ScrollWrapper id="scroll-container">
        {Children.map(this.props.children, (element, i) =>
          cloneElement(element, { ref: this.children[i] })
        )}
      </ScrollWrapper>
    )
  }
}

export default connect(
  pick([
    'backImage',
    'backSlider',
    'hasBackImage',
    'hiddenDown',
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
)(ScrollContainer)
