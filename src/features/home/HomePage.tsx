import { FC, useEffect, useState } from 'react'

const eventStart = new Date('Jun 2 2023 09:00:00 GMT-0500').getTime()

const HomePage: FC = () => {
  const [countdown, setCountdown] = useState(eventStart - Date.now())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(eventStart - Date.now())
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const days = Math.floor(countdown / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000)

  return (
    <div>
      <div className='grid auto-cols-max grid-flow-col justify-center gap-5 text-center'>
        <div className='rounded-box flex flex-col bg-neutral p-2 text-neutral-content'>
          <span className='countdown font-mono text-5xl'>
            {/* @ts-expect-errors this is part of daisyUI api. */}
            <span style={{ '--value': days }} />
          </span>
          Days
        </div>
        <div className='rounded-box flex flex-col bg-neutral p-2 text-neutral-content'>
          <span className='countdown font-mono text-5xl'>
            {/* @ts-expect-errors this is part of daisyUI api. */}
            <span style={{ '--value': hours }} />
          </span>
          Hours
        </div>
        <div className='rounded-box flex flex-col bg-neutral p-2 text-neutral-content'>
          <span className='countdown font-mono text-5xl'>
            {/* @ts-expect-errors this is part of daisyUI api. */}
            <span style={{ '--value': minutes }} />
          </span>
          Min
        </div>
        <div className='rounded-box flex flex-col bg-neutral p-2 text-neutral-content'>
          <span className='countdown font-mono text-5xl'>
            {/* @ts-expect-errors this is part of daisyUI api. */}
            <span style={{ '--value': seconds }} />
          </span>
          Sec
        </div>
      </div>
    </div>
  )
}

export default HomePage
