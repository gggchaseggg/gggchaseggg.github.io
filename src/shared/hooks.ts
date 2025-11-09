import { type MouseEvent, type TouchEvent, useCallback, useRef } from 'react'

type UseLongPressOptions = {
  shouldPreventDefault?: boolean
  delay?: number
  preventClickAfterLongPress?: boolean
}

type UseLongPressReturn = {
  onMouseDown: (event: MouseEvent) => void
  onTouchStart: (event: TouchEvent) => void
  onMouseUp: (event: MouseEvent) => void
  onMouseLeave: (event: MouseEvent) => void
  onTouchEnd: (event: TouchEvent) => void
}

type UseLongPressArguments = {
  onLongPress?: (event: MouseEvent | TouchEvent) => void
  onClick?: (event: MouseEvent | TouchEvent) => void
  settings?: UseLongPressOptions
}

type UseLongPressHook = (args: UseLongPressArguments) => UseLongPressReturn

export const useLongPress: UseLongPressHook = ({
  onLongPress,
  onClick,
  settings: {
    shouldPreventDefault = true,
    delay = 300,
    preventClickAfterLongPress = true,
  } = {},
}) => {
  //@ts-expect-error
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const target = useRef<EventTarget | null>(null)
  const longPressTriggered = useRef(false)

  const preventDefault = useCallback((event: Event) => {
    const touchEvent = event as unknown as TouchEvent
    if (
      touchEvent.touches &&
      touchEvent.touches.length < 2 &&
      event.preventDefault
    ) {
      event.preventDefault()
    }
  }, [])

  const start = useCallback(
    (event: MouseEvent | TouchEvent) => {
      longPressTriggered.current = false

      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        })
        target.current = event.target
      }

      timeout.current = setTimeout(() => {
        longPressTriggered.current = true
        onLongPress?.(event)
      }, delay)
    },
    [onLongPress, delay, shouldPreventDefault, preventDefault],
  )

  const clear = useCallback(
    (event: MouseEvent | TouchEvent, shouldTriggerClick = true) => {
      const wasLongPress = longPressTriggered.current

      if (timeout.current) {
        clearTimeout(timeout.current)
        timeout.current = undefined
      }

      if (
        shouldTriggerClick &&
        onClick &&
        (!preventClickAfterLongPress || !wasLongPress)
      ) {
        onClick(event)
      }

      longPressTriggered.current = false

      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault)
      }
    },
    [shouldPreventDefault, onClick, preventClickAfterLongPress, preventDefault],
  )

  return {
    onMouseDown: (e: MouseEvent) => start(e),
    onTouchStart: (e: TouchEvent) => start(e),
    onMouseUp: (e: MouseEvent) => clear(e, true),
    onMouseLeave: (e: MouseEvent) => clear(e, false),
    onTouchEnd: (e: TouchEvent) => clear(e, true),
  }
}
