import flip from 'crocks/combinators/flip'
import curry from 'crocks/helpers/curry'
import propPath from 'crocks/Maybe/propPath'
import offset from 'dom-helpers/query/offset'
import camelCase from 'lodash/fp/camelCase'
import debounce from 'lodash/fp/debounce'
import delay from 'lodash/fp/delay'
import { 
  and, any, assoc, compose, equals, F, gt,
  ifElse, isNil, length, lt, lte, lensPath,
  map, merge, not, path, pathOr, pipe,
  replace, view 
} from 'ramda'
import * as uuid from 'uuid/v1'

export {
  propPath, flip,
  offset,
  camelCase, debounce, delay,
  and, any, assoc, compose, equals, F, gt,
  ifElse, isNil, length, lt, lte, lensPath,
  map, merge, not, path, pathOr, pipe,
  replace, view,
  uuid
}

export const lengthLte = curry((num, x) => lte(length(x), num))
