/* global tw */
import styled from 'react-emotion'

import LogoSvg from '../../assets/orchestra-logo.svg'
import LogoBlackSvg from '../../assets/orchestra-logo-black.svg'

const Logo = styled('div')`
  ${tw('absolute pin-t pin-l bg-right-bottom bg-contain bg-no-repeat')};
  width: calc(220px + 90 * ((100vw - 320px) / 1280));
  height: calc(72px + 24 * ((100vw - 320px) / 1280));
  margin: 5px;
  min-height: 84px;
  min-width: 260px;
  background-image: url(${({primaryColor}) => primaryColor && primaryColor === '#000000' ? LogoBlackSvg : LogoSvg});
`

export {
  Logo
}