import flip from 'crocks/combinators/flip'
import curry from 'crocks/helpers/curry'
import unless from 'crocks/logic/unless'
import when from 'crocks/logic/when'
import propPath from 'crocks/Maybe/propPath'
import offset from 'dom-helpers/query/offset'
import camelCase from 'lodash/fp/camelCase'
import debounce from 'lodash/fp/debounce'
import delay from 'lodash/fp/delay'
import { 
  and, any, assoc, compose, equals, F, find, gt,
  head, ifElse, isNil, length, lt, lte, lensPath,
  map, merge, not, omit, path, pathOr, pick, pipe, propEq,
  replace, view 
} from 'ramda'
import * as uuid from 'uuid/v1'

export {
  propPath, flip, unless, when,
  offset,
  camelCase, debounce, delay,
  and, any, assoc, compose, equals, F, find, 
  gt, head, ifElse, isNil, length, lt, lte, 
  lensPath, map, merge, not, omit, path, pathOr,pick, 
  pipe, propEq, replace, view,
  uuid
}

export const lengthLte = curry((num, x) => 
  lte(length(x), num)
)

export const imageResolutions = path(['localFile', 'childImageSharp', 'resolutions'])
export const imageSizes = path(['localFile', 'childImageSharp', 'sizes'])