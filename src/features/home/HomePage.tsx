import { FC, useEffect, useState } from 'react'

const eventStart = new Date('Jun 2 2023 09:00:00 GMT-0500').getTime()

const rules = [
  {
    heading: 'SizeCon is a kinky place.',
    details: [
      'SizeCon is largely an adult convention, open to anyone ages 18 and older.'
    ]
  },
  {
    heading: 'Please be considerate of the hotel and its guests.',
    details: [
      `Please help us keep SizeCon clean and considerate, by putting all your
      trash in garbage bins, and by keeping noise levels down outside of the
      convention rooms, including in hotel room parties during and after
      SizeCon.`
    ]
  },
  {
    heading: 'Please respect boundaries outside the con floor.',
    details: [
      `Outside of the convention doors, we ask our attendees to adhere to what
      is generally considered appropriate in terms of dress. Please refrain
      from bringing costumes or masks that may scare or intimidate guests.`
    ]
  },
  {
    heading: 'Please respect boundaries on the con floor.',
    details: [
      `Badges will be marked to distinguish whether given attendees are
      comfortable with adult content and discussions. Please be considerate of
      attendees unwilling to discuss in such a manner!`,
      'Below is an example of a badge:'
    ],
    img: ''
  },
  {
    heading: 'No photos or videos on the con floor.',
    details: [
      `Attendees are asked to apply stickers to their phone cameras while
      enjoying the convention. We have an official photographer who is allowed
      to take photos with consent; informal consent on the part of attendees
      is indicated by wristbands that will be handed out at the check-in desk.
      NO KINKSHAMING: SizeCon is a JUDGE-FREE space. We’re inclusive of all
      manner of gender identity, sexual orientation (or lack thereof), and
      kink: size-kink, furry-kink, fluffy and cruel fantasies, and so on. It
      doesn’t matter who or how we love, but what we love: our common size
      fascination is what’s bringing us all together.`
    ]
  },
  {
    heading: 'No harassment.',
    details: [
      `We have a zero-tolerance policy for harassment, conducted by attendees
      and staff alike, which can include but is not limited to: unwelcome
      and/or hostile verbal or physical interactions; derogatory remarks
      grounded in discrimination against race, sex, gender identity, or other
      perceived belonging to a category, class, or group; nonconsensual
      recordings; or otherwise. Security is present at all times, and
      empowered to expel harassing parties from the convention and its related
      online spaces.`
    ]
  },
  {
    heading: 'Please report to staff if you find yourself being harassed.',
    details: [
      `We’re interested in keeping our attendees safe and our atmosphere
      pleasant. If another attendee disrupts your experience enough to make
      you reconsider coming to our convention, please feel free to submit a
      report at any time, whether over email, in-person, via our Discord
      server, and so on.`
    ]
  },
  {
    heading: 'Please comply with stop requests.',
    details: [
      `If a member of staff asks you to stop doing something potentially
      disruptive, please stop doing it.`
    ]
  },
  {
    heading: 'We value your trust.',
    details: [
      `We advise our staff to refrain from making advances on attendees
      (intimate, romantic, or otherwise) while they are performing duties as
      staff, where such a relationship does not previously exist. This is to
      avoid the exploitation, unwitting or not, of the power dynamic between
      staff and attendees in a kink convention space.`
    ]
  }
]

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
      <h2 className='mb-4 text-center text-2xl font-semibold'>
        Countdown to SizeCon 2023!
      </h2>
      <div className='mb-4 grid auto-cols-max grid-flow-col justify-between gap-5 text-center'>
        <div className='rounded-box flex flex-col bg-primary p-2 text-primary-content'>
          <span className='countdown font-mono text-5xl'>
            {/* @ts-expect-errors this is part of daisyUI api. */}
            <span style={{ '--value': days }} />
          </span>
          Days
        </div>
        <div className='rounded-box flex flex-col bg-primary p-2 text-primary-content'>
          <span className='countdown font-mono text-5xl'>
            {/* @ts-expect-errors this is part of daisyUI api. */}
            <span style={{ '--value': hours }} />
          </span>
          Hours
        </div>
        <div className='rounded-box flex flex-col bg-primary p-2 text-primary-content'>
          <span className='countdown font-mono text-5xl'>
            {/* @ts-expect-errors this is part of daisyUI api. */}
            <span style={{ '--value': minutes }} />
          </span>
          Min
        </div>
        <div className='rounded-box flex flex-col bg-primary p-2 text-primary-content'>
          <span className='countdown font-mono text-5xl'>
            {/* @ts-expect-errors this is part of daisyUI api. */}
            <span style={{ '--value': seconds }} />
          </span>
          Sec
        </div>
      </div>
      <div className='divider' />
      <div className='collapse-open rounded-box collapse bg-neutral text-neutral-content'>
        <input type='checkbox' />
        <h2 className='collapse-title text-xl font-bold'>Rules</h2>
        <div className='collapse-content'>
          {rules.map(rule => (
            <div key={rule.heading} className='mb-5'>
              <h3 className='mb-1 text-lg font-semibold text-primary'>
                {rule.heading}
              </h3>
              {rule.details.map(detail => (
                <p key={detail} className='mb-1 text-sm'>
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* <h2 className='mb-3 text-2xl font-bold'>Rules</h2> */}

      {/* <label htmlFor='rules-modal' className='btn'>
        Rules
      </label>

      <input type='checkbox' id='rules-modal' className='modal-toggle' />
      <label htmlFor='rules-modal' className='modal cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          <h2 className='mb-5 text-center text-3xl font-bold uppercase'>
            Rules
          </h2>
          <h3 className='mb-0 text-lg font-semibold'>
            SizeCon is a kinky place.
          </h3>
          <p className='mb-4'>
            SizeCon is largely an adult convention, open to anyone ages 18 and
            older.
          </p>
          <h3 className='mb-0 text-lg font-semibold'>
            Please be considerate of the hotel and its guests.
          </h3>
          <p className='mb-4'>
            SizeCon is largely an adult convention, open to anyone ages 18 and
            older.
          </p>

          <div className='modal-action'>
            <label htmlFor='rules-modal' className='btn'>
              Yay!
            </label>
          </div>
        </label>
      </label> */}
    </div>
  )
}

export default HomePage
