import { isArray } from 'crocks/predicates'
import constant from 'crocks/combinators/constant'
import curry from 'crocks/helpers/curry'
import flip from 'crocks/combinators/flip'
import ifElse from 'crocks/logic/ifElse'
import { of } from 'crocks/Maybe'
import once from 'crocks/helpers/once'
import option from 'crocks/pointfree/option'
import safe from 'crocks/Maybe/safe'
import unless from 'crocks/logic/unless'
import when from 'crocks/logic/when'
import propPath from 'crocks/Maybe/propPath'
import unit from 'crocks/helpers/unit'

import offset from 'dom-helpers/query/offset'

import camelCase from 'lodash/fp/camelCase'
import debounce from 'lodash/fp/debounce'
import delay from 'lodash/fp/delay'
import includes from 'lodash/fp/includes'
import startCase from 'lodash/fp/startCase'

import {
  and,
  any,
  assoc,
  compose,
  concat,
  contains,
  drop,
  equals,
  F,
  filter,
  find,
  gt,
  head,
  identity,
  isEmpty,
  isNil,
  keysIn,
  length,
  lt,
  lte,
  lensPath,
  map,
  merge,
  mergeDeepWith,
  not,
  objOf,
  omit,
  or,
  path,
  pathOr,
  pick,
  pipe,
  propEq,
  reduce,
  replace,
  splitEvery,
  tail,
  uniq,
  values,
  view,
} from 'ramda'
import * as uuid from 'uuid/v1'

export {
  isArray,
  constant,
  curry,
  ifElse,
  flip,
  propPath,
  of,
  option,
  once,
  safe,
  unit,
  unless,
  when,
  offset,
  camelCase,
  debounce,
  delay,
  includes,
  startCase,
  and,
  any,
  assoc,
  compose,
  concat,
  contains,
  drop,
  equals,
  F,
  filter,
  find,
  gt,
  head,
  identity,
  isEmpty,
  isNil,
  keysIn,
  length,
  lt,
  lte,
  lensPath,
  map,
  merge,
  mergeDeepWith,
  not,
  objOf,
  omit,
  or,
  path,
  pathOr,
  pick,
  pipe,
  propEq,
  reduce,
  replace,
  splitEvery,
  tail,
  uniq,
  values,
  view,
  uuid,
}

export const lengthLte = curry((num, x) => lte(length(x), num))

export const imageResolutions = path([
  'localFile',
  'childImageSharp',
  'resolutions',
])
export const imageSizes = path(['localFile', 'childImageSharp', 'sizes'])

export const notIsNil = x => not(isNil(x))

export const safeMap = curry((fn, xs) => when(notIsNil, map(fn))(xs))

export const toRGBA = op => hex =>
  `rgba(${parseInt(hex.substring(1, 3), 16)}, ${parseInt(
    hex.substring(3, 5),
    16
  )}, ${parseInt(hex.substring(5, 7), 16)}, ${op})`
