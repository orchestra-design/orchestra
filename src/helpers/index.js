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
import offset from 'dom-helpers/query/offset'
import camelCase from 'lodash/fp/camelCase'
import debounce from 'lodash/fp/debounce'
import delay from 'lodash/fp/delay'
import { 
  and, any, assoc, compose, concat, contains, 
  drop, equals, F, filter, find, gt, head, identity, 
  isNil, length, lt, lte, lensPath, 
  map, merge, mergeDeepWith, not, omit, 
  path, pathOr, pick, pipe, propEq, reduce,
  replace, splitEvery, uniq, view 
} from 'ramda'
import * as uuid from 'uuid/v1'

export {
  isArray, constant, curry, ifElse, flip, 
  propPath, of, option, once, safe, 
  unless, when,
  offset,
  camelCase, debounce, delay,
  and, any, assoc, compose, concat, contains, 
  drop, equals, F, filter, find, gt, head, 
  identity, isNil, length, lt, lte, 
  lensPath, map, merge, mergeDeepWith, not, omit, 
  path, pathOr, pick, pipe, propEq, reduce, replace, 
  splitEvery, uniq, view,
  uuid
}

export const lengthLte = curry((num, x) => 
  lte(length(x), num)
)

export const imageResolutions = path(['localFile', 'childImageSharp', 'resolutions'])
export const imageSizes = path(['localFile', 'childImageSharp', 'sizes'])

export const notIsNil = x => not(isNil(x))

export const safeMap = curry(
  (fn, xs) => 
    when(notIsNil, map(fn))(xs)
  )