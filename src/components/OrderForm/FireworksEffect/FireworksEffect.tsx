import { Fireworks } from 'fireworks-js'
import { useEffect, useRef } from 'react'

const FireworksEffect = () => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      const fireworks = new Fireworks(ref.current)
      fireworks.start()

      setTimeout(() => {
        fireworks.stop()
      }, 5000)
    }
  }, [])

  return <div ref={ref} className="absolute inset-0 z-50"></div>
}

export default FireworksEffect
