import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class'
import { findDOMNode } from 'react-dom';
import getOffset from 'dom-helpers/query/offset';

let ScrollSpy = createReactClass({
  childContextTypes: {
    $scrollSpy: PropTypes.shape({
      anchor: PropTypes.func,
      activeTarget: PropTypes.string
    })
  },
  getInitialState(){
    return { activeTarget: null }
  },

  getChildContext() {
    return {
      $scrollSpy: {
        anchor: (name, node) => {
          this._anchors.set(name, node)
          this.handleScroll()
        },
        activeTarget: this.state.activeTarget
      }
    }
  },
  UNSAFE_componentWillMount(){
    this._anchors = new Map();
  },

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false)
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false)
  },

  render() {
    return (
      this.props.children
    )
  },

  handleScroll() {
    cancelAnimationFrame(this._rafID)
    this._rafID = requestAnimationFrame(() =>
      this.update()
    )
  },

  update() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageOffsetY;
    let current = this.state.activeTarget;

    let nodes = Array
      .from(this._anchors.entries())
      .map(([name, node]) => {
        return [name, getOffset(node).top]
      })
      .sort((a, b) => a[1] - b[1])

    for (let i = 0; i < nodes.length; i++) {
      let [name, offset] = nodes[i];
      let next = nodes[i + 1]

      if (current !== name && scrollTop >= offset && (!next || scrollTop < next[1])) {
        this.setState({ activeTarget: name })
        break;
      }
    }
  }
})

let ScrollSpyAnchor = createReactClass({
  propTypes: {
    id: PropTypes.string.isRequired,
    injectID: PropTypes.bool,
  },
  contextTypes: {
    $scrollSpy: PropTypes.shape({
      anchor: PropTypes.func
    })
  },
  getDefaultProps(){
    return { injectID: true }
  },

  componentDidMount() {
    this.context.$scrollSpy.anchor(this.props.id, findDOMNode(this))
  },

  render() {
    let { children, injectID, id } = this.props;

    if (injectID)
      children = React.cloneElement(children, { id })

    return children
  }
})

let ScrollSpyTarget = createReactClass({
  propTypes: {
    href: PropTypes.string.isRequired,
    inject: PropTypes.func
  },
  contextTypes: {
    $scrollSpy: PropTypes.shape({
      activeTarget: PropTypes.string
    })
  },

  render() {
    let { children, inject = this._inject, href } = this.props;
    let isActive = this.context.$scrollSpy.activeTarget === href

    return React.cloneElement(
      children, inject(isActive, href, children.props)
    )
  },

  _inject(active, href) {
    return { active, href: '#' + href }
  }
})

ScrollSpy.Target = ScrollSpyTarget;
ScrollSpy.Anchor = ScrollSpyAnchor;

export default ScrollSpy;
