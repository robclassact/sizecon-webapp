import { FC, MouseEvent } from 'react'

import schedule_06_02_2023 from 'assets/json/events_06_02_2023.json'
import { useLocalStorage } from 'usehooks-ts'
import clsx from 'clsx'
import { BsBookmarkDashFill, BsBookmarkPlus } from 'react-icons/bs'

const EventsPage: FC = () => {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>(
    'eventBookmarks',
    []
  )

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
      <div className='grid grid-cols-1 gap-3'>
        {schedule_06_02_2023.map(event => {
          const isBookmarked = bookmarks.includes(event.slug)
          return (
            // <div
            //   key={event.slug}
            //   className={clsx(
            //     'card-compact card card-side relative rounded-xl shadow-md',
            //     isBookmarked
            //       ? 'bg-primary text-primary-content'
            //       : 'bg-neutral text-neutral-content'
            //   )}
            // >
            //   <div className='card-body'>
            //     <h2 className='card-title'>{event.title}</h2>
            //     <p
            //       className={clsx(
            //         '-mt-2 font-semibold',
            //         isBookmarked ? 'text-neutral' : 'text-primary'
            //       )}
            //     >
            //       {event.time}
            //     </p>
            //     <p>{event.description}</p>
            //   </div>
            //   <button
            //     className={
            //       'btn-ghost btn-square btn absolute right-0 top-0 rounded-bl-xl rounded-br-none rounded-tl-none rounded-tr-xl'
            //     }
            //     onClick={handleBookmarkToggle(event.slug)}
            //     title='Bookmark'
            //     type='button'
            //   >
            //     {isBookmarked ? (
            //       <BsBookmarkDashFill className='h-6 w-6' />
            //     ) : (
            //       <BsBookmarkPlus className='h-6 w-6' />
            //     )}
            //   </button>
            // </div>
            <div
              key={event.slug}
              className={clsx(
                'card collapse relative',
                isBookmarked
                  ? 'bg-primary text-primary-content'
                  : 'bg-neutral text-neutral-content'
              )}
            >
              <input type='checkbox' />
              <div className='collapse-title flex space-x-2 text-xl font-medium'>
                <div>
                  <div>{event.title}</div>
                  <div
                    className={clsx(
                      'badge font-medium',
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
