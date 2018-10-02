/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import {
  Body,
  ButtonText,
  Description,
  Logo,
  Container,
  SocialButton,
} from '../elements'
import { safeMap, uuid, pick } from '../../helpers'

const FooterContainer = styled('div')`
  ${tw(['flex', 'pt-q200', 'w-full'])};
  color: ${props => props.theme.color};
  min-height: calc(100vh - 375px);
`

const Row = styled('div')`
  ${tw(['flex', 'flex-col', 'screen:flex-row'])};
`

const LogoWrapper = styled('div')`
  height: 69px;
  width: 186px;
`

const DescriptionText = styled('div')`
  ${Body};
  ${tw(['max-w-sm', 'px-q12'])};
`

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
    'items-center',
    'my-q72',
    'screen:mb-q24',
    'screen:mt-q144',
  ])};
`

export const Footer = connect(pick(['isFooter']))(({ isFooter, meta }) => {
  const {
    acciolink,
    addressesfr,
    addressesru,
    description,
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
        <Row>
          <Row
            className={css`
              ${tw('w-full screen:items-center')};
            `}
          >
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
            <DescriptionText
              dangerouslySetInnerHTML={{ __html: description.html }}
            />
          </Row>
        </Row>
        <Row
          className={css`
            ${tw('mt-q36 screen:mt-q144')};
          `}
        >
          <Paragraph
            className={css`
              width: calc(186px - 0.75rem);
            `}
            dangerouslySetInnerHTML={{ __html: addressesru.html }}
          />
          <Paragraph dangerouslySetInnerHTML={{ __html: addressesfr.html }} />
        </Row>
        <Row>
          <Paragraph
            className={css`
              ${tw(['mt-q60'])};
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
      {isFooter && (
        <div
          className={css`
            ${tw([
              'fixed',
              'm-q24',
              'mr-q72',
              'screen:mr-q80',
              'pin-b',
              'pin-r',
            ])};
          `}
        >
          <Row
            className={css`
              ${tw('flex-row screen:ml-auto')};
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
          </Row>
        </div>
      )}
    </FooterContainer>
  )
})
