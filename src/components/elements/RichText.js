/* global tw */
import { css } from 'react-emotion'

import { 
  Body, ButtonText, 
  Heading2, Heading3, Heading4,
  LeadText, List
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
  & h2 {
    ${Heading2};
    ${tw(['mb-q32', 'md:mb-q36'])};
  }
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
    ${tw(['m-0'])};
  }
  & .link {
    ${ButtonText};
  }
  & ul {
    ${List};
    ${tw(['my-q48'])};
  }
  & li {
    ${tw([
      'mb-q12', 'pl-q32', 'relative'
    ])};
  }
  & li::after {
    content: '';
    ${tw([
      'absolute', 'bg-black', 'block', 
      'h-q8', 'pin-l', 'pin-t', 'w-q8'
    ])};
    top: 0.625rem;
  }
`
