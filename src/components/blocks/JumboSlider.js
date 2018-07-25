/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'
import { Transition, animated } from 'react-spring'

import { 
  Breadcrumbs, Container, Heading2, 
  Heading3, JustImage, JumboDownButton, JumboDummy
} from '../elements'

import {
  notIsNil, uuid
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

const transitionGroup = data => data.jumbo.map(({ jumbotitle }) => 
  style => 
    <animated.div style={{...style, willChange: 'transform, opacity'}} >
      <Heading>{ jumbotitle.text }</Heading>
    </animated.div>
)

const TransitionHeading = ({ data, jumboCount }) => (
  <Transition
    native
    from={{ opacity: .0, transform: 'translateY(100%)' }}
    enter={{ opacity: 1, transform: 'translateY(0%)' }} 
    leave={{ opacity: .0, transform: 'translateY(-50%)' }}
  >{ transitionGroup(data)[jumboCount] }</Transition> 
)

export const JumboSlider = connect(
    ({ jumboCount }) => ({ jumboCount })
  )(({ data, jumboCount }) => {
  const { jumbo } = data
  return (
    <Fragment>
      <FullScreenSection>
        {jumbo.map(({ jumboimage, jumbotitle }) =>
          <JumboMobile key={uuid()} >
            <JustImage key={uuid()} image={jumboimage} />
            <Heading key={uuid()} >{ jumbotitle.text }</Heading>
          </JumboMobile>
        )}
        {notIsNil(jumboCount) && 
          <Fixed>
            <Container className={css`${tw('relative mb-q72 screen:mb-q144',)};`} >
              <Breadcrumbs 
                className={css`text-shadow: 0 0 .75rem rgba(0,0,0,0.24);`} 
              >{ data.title.text }</Breadcrumbs>
              <TransitionHeading {...{data}} {...{jumboCount}} />             
            </Container>
            <JumboDownButton />
          </Fixed>
        }
      </FullScreenSection>
      <JumboDummy {...{jumbo}} />
    </Fragment>
  )
})