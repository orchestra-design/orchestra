import React from 'react'
import Link from 'gatsby-link'

import { length, lte, ifElse } from '../../helpers'
import { Logo } from './Logo'

export const HeaderLogo = ({ lang, path }) => ifElse(
  path => lte(length(path), 3),
  () => <Logo />,
  () => <Link to={`/${lang.replace('-us', '')}`} ><Logo /></Link>
)(path)