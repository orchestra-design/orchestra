/* global tw */
import React from 'react'
import styled from 'react-emotion'

import { ButtonText } from './Typography'

const Breadcrumbs = styled('div')`
  ${ButtonText};
  ${tw([
    'hidden', 'justify-center', 'items-center',
    'ml-q36', 'mr-auto', 'whitespace-no-wrap'
  ])};
  ${({ collapseTransition, isMenu }) => !collapseTransition && isMenu && 
    tw(['screen:h-q48', 'screen:text-lg'])
  };
  ${({ collapsedMenu }) => collapsedMenu && 
    tw(['flex', 'screen:h-q36', 'screen:text-sm'])
  };
  ${({ isMenu }) => isMenu && 
    tw(['flex', 'w-full', 'm-0', 'screen:h-q36', 'screen:text-sm'])
  };
  @media(max-width: 576px) {
    order: 1;
  }
  color: ${props => props.theme.color};
`

export const HeaderBreadcrumbs = ({ 
  collapsedMenu, collapseTransition, 
  hiddenMenu, isMenu, title 
}) => (
  <Breadcrumbs
    {...{collapsedMenu}}
    {...{collapseTransition}}
    {...{hiddenMenu}}
    {...{isMenu}}
  >{ title }</Breadcrumbs>
)