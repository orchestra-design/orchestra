import offset from 'dom-helpers/query/offset'
import camelCase from 'lodash/fp/camelCase'
import { 
  and, any, assoc, compose, curry, equals,
  ifElse, isNil, length, lte, lensPath,
  map, merge, not, path, pathOr, 
  replace, view 
} from 'ramda'
import * as uuid from 'uuid/v1'

export {
  offset,
  camelCase, 
  and, any, assoc, compose, equals,
  ifElse, isNil, length, lte, lensPath,
  map, merge, not, path, pathOr, 
  replace, view,
  uuid
}

export const lengthLte = curry((num, x) => lte(length(x), num))