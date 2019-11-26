/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'

import {
  // Body,
  ButtonText,
  Description,
  // Logo,
  Container,
  SocialButton,
} from '../elements'
import { safeMap, uuid } from '../../helpers'

const FooterContainer = styled('div')`
  ${tw(['flex', 'pt-q24', 'w-full'])};
  color: ${props => props.theme.color};
`

const Row = styled('div')`
  ${tw(['flex', 'flex-col', 'screen:flex-row'])};
`
/* 
const LogoWrapper = styled('div')`
  height: 69px;
  width: 186px;
`

const DescriptionText = styled('div')`
  ${Body};
  ${tw(['max-w-sm', 'px-q12'])};
` */

const Paragraph = styled('div')`
  ${Description};
  ${tw(['flex-no-shrink', 'pl-q12', 'leading-normal'])};
  p {
    ${tw(['p-0', 'm-0'])};
  }
`

const Link = styled('a')`
  ${tw(['no-underline', 'hover:underline'])};
  color: ${props => props.theme.color};
`

const SocialLink = SocialButton.withComponent('a')

const Accio = styled('div')`
  ${tw([
    'flex',
    'h-q36',
    'items-baseline',
    'pt-q12',
    'my-q12',
  ])};
`

export const Footer = ({ meta }) => {
  const {
    acciolink,
    addressesfr,
    addressesru,
    // description,
    development,
    email,
    links,
  } = meta.data

  return (
    <FooterContainer>
      <Container
        className={css`
          ${tw(['flex', 'flex-col', 'justify-between'])};
        `}
      >
        <Row
          className={css`
            ${tw(['mt-q48'])};
          `}
        >
          <Paragraph
            className={css`
              ${tw(['mb-q12', 'screen:mb-0'])};
              width: calc(186px - 0.75rem);
            `}
            dangerouslySetInnerHTML={{ __html: addressesru.html }}
          />
          <Paragraph dangerouslySetInnerHTML={{ __html: addressesfr.html }} />
          <div
            className={css`
              ${tw('flex flex-row mt-q12 screen:mt-0 screen:ml-auto screen:items-center')};
            `}
          >
            {safeMap(
              ({ link, linktype }) => (
                <SocialLink
                  key={uuid()}
                  href={link.url}
                  {...{ linktype }}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              links
            )}
          </div>
        </Row>
        <Row>
          <Paragraph
            className={css`
              ${tw(['mt-q12'])};
            `}
          >
            <a
              className={css`
                ${tw(['no-underline'])};
                &,
                &:hover {
                  color: inherit;
                }
              `}
              href={email.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {email.url.replace('mailto:', '')}
            </a>
          </Paragraph>
        </Row>
        <Accio>
          <span
            className={css`
              ${Description};
              ${tw('px-q12')};
            `}
          >
            {development}
          </span>
          <Link
            className={css`
              ${ButtonText};
            `}
            href={acciolink.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            accio
          </Link>
        </Accio>
      </Container>
    </FooterContainer>
  )
}


/* 

*/