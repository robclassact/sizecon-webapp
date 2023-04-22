import guests from 'assets/json/guests_2023.json'
import clsx from 'clsx'
import Page from 'components/Page'
import { ChangeEvent, FC, Fragment, MouseEvent } from 'react'
import {
  BsBookmarkDashFill,
  BsBookmarkPlus,
  BsInstagram,
  BsTiktok,
  BsTwitter
} from 'react-icons/bs'
import { RiPatreonFill } from 'react-icons/ri'
import { SiDeviantart, SiEtsy, SiLinktree } from 'react-icons/si'
import { TbBrandOnlyfans, TbPawFilled, TbWorldWww } from 'react-icons/tb'
import { useLocalStorage } from 'usehooks-ts'

const getWebsiteIcon = (website: string) => {
  switch (website) {
    case 'Instagram':
      return <BsInstagram className='h-4 w-4' />
    case 'Twitter':
      return <BsTwitter className='h-4 w-4' />
    case 'Patreon':
      return <RiPatreonFill className='h-4 w-4' />
    case 'OnlyFans':
      return <TbBrandOnlyfans className='h-5 w-5' />
    case 'DeviantArt':
      return <SiDeviantart className='h-4 w-4' />
    case 'Tiktok':
      return <BsTiktok className='h-4 w-4' />
    case 'Fur Affinity':
      return <TbPawFilled className='h-5 w-5' />
    case 'Linktree':
      return <SiLinktree className='h-4 w-4' />
    case 'Etsy':
      return <SiEtsy className='h-3.5 w-3.5' />
    default:
      return <TbWorldWww className='h-5 w-5' />
  }
}

const GuestsPage: FC = () => {
  const [guestsFilter, setGuestsFilter] = useLocalStorage<string>(
    'guestsFilter',
    'All'
  )
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>(
    'guestBookmarks',
    []
  )

  const handleGuestsFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setGuestsFilter(event.target.value)
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

  const filteredGuests =
    guestsFilter === 'All'
      ? guests
      : guests.filter(guest =>
          guestsFilter === 'Bookmarked'
            ? bookmarks.includes(guest.slug)
            : guest.category === guestsFilter
        )

  let prev = ''

  return (
    <Page>
      <select
        className='select-bordered select mb-4 w-full font-semibold'
        value={guestsFilter}
        onChange={handleGuestsFilterChange}
      >
        <option value='All'>All Guests</option>
        <option value='Bookmarked'>Bookmarked Guests</option>
        <option value='Talent'>Talents</option>
        <option value='Artist'>Artists</option>
        <option value='Writer'>Writers</option>
        <option value='Production Studio'>Production Studios</option>
        <option value='Community Group'>Community Groups</option>
      </select>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {filteredGuests.map(guest => {
          const isBookmarked = bookmarks.includes(guest.slug)
          const addDivider = prev !== guest.category
          prev = guest.category
          return (
            <Fragment key={guest.slug}>
              {addDivider ? (
                <div className='divider text-xl uppercase'>
                  {`${guest.category}s`}
                </div>
              ) : null}
              <div
                id={guest.slug}
                className={clsx(
                  'card-compact card card-side relative shadow-md',
                  isBookmarked
                    ? 'bg-primary text-primary-content'
                    : 'bg-neutral text-neutral-content'
                )}
              >
                <figure className='w-3/5'>
                  <img className='h-full' src={guest.img} alt={guest.name} />
                </figure>
                <div className='card-body w-full'>
                  <h2 className='card-title pr-9'>{guest.name}</h2>
                  <div>{guest.description}</div>

                  <div className='card-actions flex-grow items-end'>
                    {guest.websites.map(site => (
                      <a
                        className={clsx(
                          'btn-sm btn-circle btn',
                          isBookmarked ? '' : 'btn-primary'
                        )}
                        key={site.link}
                        title={site.link}
                        href={site.link}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {getWebsiteIcon(site.title)}
                      </a>
                    ))}
                  </div>
                </div>
                <button
                  className='btn-ghost btn-square btn absolute right-0 top-0 rounded-bl-xl rounded-br-none rounded-tl-none rounded-tr-xl'
                  onClick={handleBookmarkToggle(guest.slug)}
                >
                  {isBookmarked ? (
                    <BsBookmarkDashFill className='h-6 w-6' />
                  ) : (
                    <BsBookmarkPlus className='h-6 w-6' />
                  )}
                </button>
              </div>
            </Fragment>
          )
        })}
      </div>
    </Page>
  )
}

export default GuestsPage
