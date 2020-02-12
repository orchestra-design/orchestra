/* global tw */
import { css } from 'react-emotion'

import {
  Body,
  ButtonSmallText,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  LeadText,
  List,
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
    &:last-of-type {
      ${tw(['mb-q32', 'md:mb-q36'])};
    }
  }
  & h3 {
    ${Heading3};
    &:last-of-type {
      ${tw(['mb-q24', 'md:mb-q32'])};
    }
  }
  & h4 {
    ${Heading4};
    &:last-of-type {
      ${tw(['mb-q20', 'md:mb-q24'])};
    }
  }
  & p {
    ${tw(['mt-0', 'mb-q24'])};
  }
  & .lead {
    ${LeadText};
    ${tw(['mb-q16', 'md:mb-q24'])};
  }
  & .link {
    ${tw(['underline'])};
    color: inherit;
  }
  & a {
    ${tw(['underline'])};
    color: inherit;
  }
  & strong {
    ${tw(['font-semibold'])};
  }
  & ul {
    ${List};
    ${tw(['my-q24'])};
  }
  & li {
    ${tw(['mb-q12', 'pl-q24', 'relative'])};
  }
  & li::after {
    content: '';
    ${tw(['absolute', 'bg-black', 'block', 'h-q8', 'pin-l', 'pin-t', 'w-q8'])};
    top: 0.45rem;
  }
`

export const RichTextSmall = css`
  ${List};
  & h2 {
    ${Heading3};
    &:last-of-type {
      ${tw(['mb-q32', 'md:mb-q36'])};
    }
  }
  & h3 {
    ${Heading4};
    &:last-of-type {
      ${tw(['mb-q24', 'md:mb-q32'])};
    }
  }
  & h4 {
    ${Heading5};
    &:last-of-type {
      ${tw(['mb-q16', 'md:mb-q24'])};
    }
  }
  & .lead {
    ${Heading6};
    ${tw(['m-0'])};
  }
  & .link {
    ${ButtonSmallText};
    ${tw(['no-underline'])};
    color: inherit;
  }
  & a {
    ${tw(['underline'])};
    color: inherit;
  }
  & ul {
    ${List};
    ${tw(['my-q48'])};
  }
  & li {
    ${tw(['mb-q12', 'pl-q32', 'relative'])};
  }
  & li::after {
    content: '';
    ${tw(['absolute', 'bg-black', 'block', 'h-q8', 'pin-l', 'pin-t', 'w-q8'])};
    top: 0.625rem;
  }
`
