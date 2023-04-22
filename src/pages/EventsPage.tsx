import events_schedule from 'assets/json/schedule_2023.json'
import guestsList from 'assets/json/guests_2023.json'
import clsx from 'clsx'
import { ChangeEvent, FC, Fragment, MouseEvent } from 'react'
import { BsBookmarkDashFill, BsBookmarkPlus } from 'react-icons/bs'
import { HashLink } from 'react-router-hash-link'
import { useLocalStorage } from 'usehooks-ts'
import scrollToWithOffset from 'utilities/scrollToWithOffset'

const EventsPage: FC = () => {
  const [eventsFilter, setEventsFilter] = useLocalStorage('eventsFilter', 'All')
  const [eventBookmarks, setEventBookmarks] = useLocalStorage<string[]>(
    'eventBookmarks',
    []
  )
  const [guestBookmarks] = useLocalStorage<string[]>('guestBookmarks', [])

  const handleEventsFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setEventsFilter(event.target.value)
  }

  const handleBookmarkToggle =
    (item: string) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setEventBookmarks(prev => {
        const index = prev.findIndex(i => i === item)
        if (index > -1) {
          return [...prev.slice(0, index), ...prev.slice(index + 1)]
        }
        return [...prev, item]
      })
    }

  const filteredEvents =
    eventsFilter === 'All'
      ? events_schedule
      : events_schedule.filter(event =>
          eventsFilter === 'Bookmarked'
            ? eventBookmarks.includes(event.slug)
            : event.date === eventsFilter
        )

  let prev = ''

  return (
    <div>
      <select
        className='select-bordered select mb-4 w-full font-semibold'
        value={eventsFilter}
        onChange={handleEventsFilterChange}
      >
        <option value='All'>All Events</option>
        <option value='Bookmarked'>Bookmarked Events</option>
        <option value='Friday, June 2nd 2023'>Friday, June 2nd 2023</option>
        <option value='Saturday, June 3rd 2023'>Saturday, June 3rd 2023</option>
        <option value='Sunday, June 4th 2023'>Sunday, June 4th 2023</option>
      </select>
      <div className='grid grid-cols-1 gap-4'>
        {filteredEvents.map(event => {
          const isBookmarked = eventBookmarks.includes(event.slug)
          const markedParticipant = guestBookmarks.filter(guest =>
            event.participants.includes(guest)
          )
          const addDivider = prev !== event.date
          prev = event.date
          return (
            <Fragment key={event.slug}>
              {addDivider ? (
                <div className='divider text-xl uppercase'>{event.date}</div>
              ) : null}
              <div
                id={event.slug}
                className={clsx(
                  'collapse-arrow card collapse relative',
                  isBookmarked
                    ? 'bg-primary text-primary-content'
                    : 'bg-neutral text-neutral-content'
                )}
              >
                <input type='checkbox' />
                <div className='collapse-title flex space-x-2 pr-9 text-xl font-medium after:mt-4'>
                  <div>
                    <div>{event.title}</div>
                    <div
                      className={clsx(
                        'badge badge-sm font-medium',
                        !isBookmarked && 'badge-primary'
                      )}
                    >
                      {event.time}
                    </div>
                  </div>
                </div>
                <div className='collapse-content text-sm'>
                  <p>{event.description}</p>
                </div>
                {markedParticipant.length > 0 ? (
                  <div className='card-actions z-10 mb-4 w-full px-4'>
                    {markedParticipant.map(p => (
                      <HashLink
                        key={p}
                        className='btn-ghost btn-sm btn-circle btn'
                        to={`/guests#${p}`}
                        smooth
                        scroll={scrollToWithOffset}
                      >
                        <img
                          className={clsx(
                            'rounded-full',
                            guestBookmarks.includes(p) && 'ring',
                            isBookmarked
                              ? 'ring-primary-content'
                              : 'ring-primary'
                          )}
                          src={guestsList.find(g => g.slug === p)?.img}
                        />
                      </HashLink>
                    ))}
                  </div>
                ) : null}
                <div className='absolute right-0 top-0 z-10 flex flex-col items-center justify-center'>
                  <button
                    className='btn-ghost btn-square btn absolute right-0 top-0 rounded-bl-xl rounded-br-none rounded-tl-none rounded-tr-xl'
                    onClick={handleBookmarkToggle(event.slug)}
                  >
                    {isBookmarked ? (
                      <BsBookmarkDashFill className='h-5 w-5' />
                    ) : (
                      <BsBookmarkPlus className='h-5 w-5' />
                    )}
                  </button>
                </div>
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default EventsPage
