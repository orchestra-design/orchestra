/* globals window */
import { hydrate } from 'emotion'

import wrapWithProvider from './wrap-with-provider'
export const wrapRootElement = wrapWithProvider

export const onClientEntry = () => {
  if (
    /* eslint-disable no-underscore-dangle */
    typeof window !== `undefined` &&
    typeof window.__EMOTION_CRITICAL_CSS_IDS__ !== `undefined`
  ) {
    hydrate(window.__EMOTION_CRITICAL_CSS_IDS__)
  }
}
