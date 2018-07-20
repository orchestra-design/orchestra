/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'

import { setImage } from '../../actions'

import { 
  Breadcrumbs, Container, Heading2, 
  Heading3, Image 
} from '../elements'

import {
  and, equals, gt, lt, length, path, not,
  notIsNil, offset, safeMap, uuid
} from '../../helpers'

const FullScreenSection = styled('div')`
  ${tw([
    'flex', 'flex-col', 'h-auto',
    'justify-end',
    'relative', 'w-screen'
  ])};
  color: ${({ theme }) => theme.color};
  @media(min-width: 600px) {
    height: calc(100vh / 6);
  }
`

const JumboMobile = styled('div')`
  ${tw([
    'flex', 'items-end',
    'screen:hidden', 'relative',
  ])};
  height: 75vw;
`

const Fixed = styled('div')`
  ${tw([
    'screen:fixed', 'hidden', 'screen:block',
    'pin-b', 'pin-l', 'pin-r'
  ])};
`

const Heading =  styled('h1')`
  ${Heading3};
  ${tw([
    'max-w-xs', 'screen:max-w-sm', 'relative',
    'pb-q48', 'pl-q24', 'screen:p-0', 
  ])};
  @media(min-width: 600px) {
    ${Heading2};
  }
  text-shadow: ${({ theme }) => theme.logoShadow && '0 0 1.5rem rgba(0,0,0,0.24)'};
`

const Dummy = styled('div')`
  ${tw(['hidden', 'screen:block'])}; 
  height: calc(100vh / 3);
`

const enhance = compose(
  connect(
    ({ backImage }) => ({ backImage }),
    { setImage }
  ),
  lifecycle({
    state: { current: 0 },
    updateState() {
      const jumboCounter = document.getElementById('jumbo-counter')
      const jumboCount = Array.from(jumboCounter.children)
      jumboCount.map((child, i) => {
        const { top, height } = offset(child)
        and(lt(top < 200), gt((top + height), 200)) && this.setState({ current: i })
        and(equals(i, length(jumboCount) - 2), lt((top + height), 0)) && 
          this.setState({ current: null })
        // setImage
        const newImage = JSON.stringify(this.props.data.jumbo[this.state.current].jumboimage)
        and(
          notIsNil(newImage),
          not(equals(newImage, this.props.backImage))
        ) && this.props.setImage(newImage)
        return null
      })
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

export const JumboSlider = enhance(({ data, current }) => {
  const jumbotitle = notIsNil(current) && path(['jumbo', current, 'jumbotitle'], data)

  return (
    <Fragment>
      <FullScreenSection>
        {data.jumbo.map(({ jumboimage, jumbotitle }) =>
          <JumboMobile key={uuid()} >
            <Image key={uuid()} image={jumboimage} />
            <Heading key={uuid()} >{ jumbotitle.text }</Heading>
          </JumboMobile>
        )}
        {notIsNil(current) && 
          <Fixed>
            <Container className={css`${tw('relative mb-q72 screen:mb-q144',)};`} >
              <Breadcrumbs 
                className={css`text-shadow: 0 0 .75rem rgba(0,0,0,0.24);`} 
              >{ data.title.text }</Breadcrumbs>
              <Heading >{ jumbotitle.text }</Heading>
            </Container>
          </Fixed>
        }
      </FullScreenSection>
      <div id="jumbo-counter">
      {safeMap(() => 
        <Dummy key={uuid()} />
      , data.jumbo)}
      </div>
    </Fragment>
  )
})