/* global tw */
import { css } from 'react-emotion'

import { 
  Body, 
  Heading2, Heading3, Heading4,
  LeadText
} from './Typography'

export const Headers = css`
  & h2 {
    ${Heading2};
  }
  & h3 {
    ${Heading3};
  }
  & h4 {
    ${Heading4};
  }
`

export const RichText = css`
  ${Body};
  & h3 {
    ${Heading3};
    ${tw(['mb-q24', 'md:mb-q32'])};
  }
  & h4 {
    ${Heading4};
    ${tw(['mb-q16', 'md:mb-q24'])};
  }
  & .lead {
    ${LeadText};
    ${tw(['m-0'])}
  }
`
