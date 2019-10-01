import { useEffect, useRef, useState } from 'react'

export const useThrottle = (fn, ms = 200, args = []) => {
  const [state, setState] = useState(null)
  const timeout = useRef()
  const nextArgs = useRef(null)
  const hasNextArgs = useRef(false)

  useEffect(() => {
    if (!timeout.current) {
      setState(fn(...args))
      const timeoutCallback = () => {
        if (hasNextArgs.current) {
          hasNextArgs.current = false
          setState(fn(...nextArgs.current))
          timeout.current = setTimeout(timeoutCallback, ms)
        } else {
          timeout.current = undefined
        }
      }
      timeout.current = setTimeout(timeoutCallback, ms)
    } else {
      nextArgs.current = args
      hasNextArgs.current = true
    }
  }, args) // eslint-disable-line

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current)
    }
  }, [])

  return state
}
