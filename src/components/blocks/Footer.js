/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'

import { 
  Body, ButtonText, Description, Logo, 
  Container, SocialButton
} from '../elements'
import { safeMap, uuid } from '../../helpers'

const FooterContainer = styled('div')`
  ${tw(['flex', 'pt-q200', 'w-full'])};
  color: ${props => props.theme.color};
  min-height: calc(100vh - 250px);
`

const Row = styled('div')`
  ${tw([
    'flex', 'flex-col', 'screen:flex-row',
  ])};
`

const LogoWrapper = styled('div')`
  ${tw([''])};
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
    ${tw(['p-0', 'm-0'])}
  }
`

const Link = styled('a')`  
  ${tw(['no-underline', 'hover:underline'])};
  color: ${props => props.theme.color};
`

const SocialLink = SocialButton.withComponent('a')

const Accio = styled('div')`
  ${tw(['mb-q24', 'mt-q144'])};
`

export const Footer = ({ meta }) => {
  const {
    description, addresses,
    email, links, development, acciolink
  } = meta.data
  
  return (
    <FooterContainer>
      <Container className={css`${tw('flex flex-1 flex-col justify-between')};`} >
        <Row>
          <Row className={css`${tw('flex-wrap')}`} >
            <Row className={css`${tw('w-full screen:items-center')}`} >
              <LogoWrapper><Logo /></LogoWrapper>
              <DescriptionText 
                dangerouslySetInnerHTML={{ __html: description.html }}                   
              />
            </Row>
            <Row className={css`${tw('screen:items-end mt-q36 screen:mt-q144')}`} >
              <Paragraph  className={css`width: calc(186px - .75rem);`} 
                dangerouslySetInnerHTML={{ __html: addresses.html }} 
              />
              <Paragraph className={css`${tw('w-full items-end mt-q36 screen:mt-0')}`} >
              <Link 
                href={email.url} 
                target="_blank" rel="noopener noreferrer"
              >{ email.url.replace('mailto:', '') }</Link>
              </Paragraph>
            </Row>
          </Row>
          <Row className={css`${tw('flex-row mt-q48 screen:mt-4 screen:ml-auto')}`} >
          {safeMap(({ link, linktype }) => (
            <SocialLink key={uuid()}
              href={link.url} 
              {...{linktype}}
              target="_blank" 
              rel="noopener noreferrer"
            />
          ), links)}
          </Row>
        </Row>
        <Accio>
          <span 
            className={css`${Description};${tw('px-q12')}`}
          >{ development }</span>
          <Link
            className={css`${ButtonText}`}
            href={acciolink.url} 
            target="_blank" rel="noopener noreferrer"
          >accio</Link>
        </Accio>
      </Container>
    </FooterContainer>
  )
}
