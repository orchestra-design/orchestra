/* global tw */
import React, { Component, createRef, Children } from 'react'
import ReactDOM from 'react-dom'
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
  head,
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

export const ScrollChild = ({ children }) => (
  <div
    className={css`
      ${tw(['relative'])};
    `}
  >
    {children}
  </div>
)

class ScrollContainer extends Component {
  constructor(props) {
    super(props)
    this.scrollRef = createRef()
    this.state = {
      allChildren: [],
    }
  }

  scrollHandler() {
    this.state.allChildren.map((child, i) => {
      const childOffset =
        ReactDOM.findDOMNode(this.refs[i]) !== null &&
        ReactDOM.findDOMNode(this.refs[i]).getBoundingClientRect()
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
      const newRightImage = pathOr(null, ['props', 'right-image'], child)
      const newSicGrid = pathOr(null, ['props', 'sicgrid'], child)
      const isSlider = path(['props', 'slider'], child)
      const newTheme = camelCase(child.props.theme)
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
      if (i === this.state.allChildren.length - 1) {
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
      childrenDesappearing(ReactDOM.findDOMNode(this.refs[i]))
      return F
    })
  }

  componentDidMount() {
    window !== undefined &&
      window.addEventListener('scroll', this.scrollHandler.bind(this))

    this.setState({
      allChildren: Children.toArray(this.scrollRef.current.props.children),
    })

    this.props.changeTheme(
      camelCase(pathOr('white', ['props', 'theme'], this.refs[0]))
    )
    this.props.setImage(
      pathOr(null, ['props', 'image'], head(this.state.allChildren))
    )
  }

  componentWillUnmount() {
    window !== undefined &&
      window.removeEventListener('scroll', this.scrollHandler.bind(this))
  }

  render() {
    return (
      <ScrollWrapper id="scroll-container" ref={this.scrollRef}>
        {React.Children.map(this.props.children, (element, i) => {
          return React.cloneElement(element, { ref: i })
        })}
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
