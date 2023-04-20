import schedule_06_02_2023 from 'assets/json/events_06_02_2023.json'
import schedule_06_03_2023 from 'assets/json/events_06_03_2023.json'
import schedule_06_04_2023 from 'assets/json/events_06_04_2023.json'
import clsx from 'clsx'
import { ChangeEvent, FC, MouseEvent } from 'react'
import { BsBookmarkDashFill, BsBookmarkPlus } from 'react-icons/bs'
import { useLocalStorage } from 'usehooks-ts'

const schedules = [
  schedule_06_02_2023,
  schedule_06_03_2023,
  schedule_06_04_2023
]

const EventsPage: FC = () => {
  const [scheduleIndex, setScheduleIndex] = useLocalStorage('schedule', 0)

  const [bookmarks, setBookmarks] = useLocalStorage<string[]>(
    'eventBookmarks',
    []
  )

  const handleScheduleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setScheduleIndex(parseInt(event.target.value))
  }

  const handleBookmarkToggle =
    (item: string) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setBookmarks(prev => {
        const index = prev.findIndex(i => i === item)
        if (index > -1) {
          return [...prev.slice(0, index), ...prev.slice(index + 1)]
        }
        return [...prev, item]
      })
    }

  return (
    <div>
      <select
        className='select-bordered select mb-4 w-full font-semibold'
        value={scheduleIndex}
        onChange={handleScheduleSelect}
      >
        <option value={0}>Firday, June 2nd, 2023</option>
        <option value={1}>Saturday, June 3rd, 2023</option>
        <option value={2}>Sunday, June 4th, 2023</option>
      </select>
      <div className='grid grid-cols-1 gap-4'>
        {schedules[scheduleIndex].map(event => {
          const isBookmarked = bookmarks.includes(event.slug)
          return (
            <div
              key={event.slug}
              className={clsx(
                'card collapse-arrow collapse relative',
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
                      isBookmarked ? 'text-primary' : 'badge-primary'
                    )}
                  >
                    {event.time}
                  </div>
                </div>
              </div>
              <div className='collapse-content text-sm'>
                <p>{event.description}</p>
              </div>
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
          )
        })}
      </div>
    </div>
  )
}

export default EventsPage
