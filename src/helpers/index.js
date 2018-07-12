import flip from 'crocks/combinators/flip'
import propPath from 'crocks/Maybe/propPath'
import offset from 'dom-helpers/query/offset'
import camelCase from 'lodash/fp/camelCase'
import delay from 'lodash/fp/delay'
import { 
  and, any, assoc, compose, curry, equals, F, gt,
  ifElse, isNil, length, lt, lte, lensPath,
  map, merge, not, path, pathOr, 
  replace, view 
} from 'ramda'
import * as uuid from 'uuid/v1'

export {
  propPath, flip,
  offset,
  camelCase, delay,
  and, any, assoc, compose, equals, F, gt,
  ifElse, isNil, length, lt, lte, lensPath,
  map, merge, not, path, pathOr, 
  replace, view,
  uuid
}

export const lengthLte = curry((num, x) => lte(length(x), num))