import { FC, MouseEvent } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineSparkles
  // HiOutlineMapPin,
  // HiOutlineBookmarkSquare
} from 'react-icons/hi2'
import clsx from 'clsx'
import { useLocalStorage } from 'usehooks-ts'
import app_logo_src from 'assets/images/app_logo.gif'

type IconType = typeof HiOutlineHome

type NavigationLink = {
  path: string
  title: string
  icon: IconType
}

const routes: NavigationLink[] = [
  {
    path: '/',
    title: 'Home',
    icon: HiOutlineHome
  },
  {
    path: '/events',
    title: 'Events',
    icon: HiOutlineCalendar
  },
  {
    path: '/guests',
    title: 'Guests',
    icon: HiOutlineSparkles
  }
  // {
  //   path: '/floor-map',
  //   title: 'Map',
  //   icon: HiOutlineMapPin
  // },
  // {
  //   path: '/bookmarks',
  //   title: 'Bookmarks',
  //   icon: HiOutlineBookmarkSquare
  // }
]

const MainLayout: FC = () => {
  const location = useLocation()
  const [isOfAge, setIsOfAge] = useLocalStorage('isOfAge', false)

  const handleAgeConfirmation =
    (verified: boolean) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setIsOfAge(verified)
      if (verified === false) {
        history.back()
      }
    }

  if (isOfAge === false) {
    return (
      <div className='flex h-[100dvh] w-full flex-col items-center justify-center bg-primary p-8 text-primary-content'>
        <div className='mb-4 text-center text-3xl font-bold'>
          ENTER ONLY IF YOU ARE OVER 18
        </div>
        <div className='mb-5 text-lg'>
          Website contains content of adult nature and is only available to
          adults. If you are under the age of 18 (or 21 in some countries), if
          it is illegal to view such material in your jurisdiction or it offends
          you, please do not continue.
        </div>
        <div className='grid w-full grid-cols-2 gap-3'>
          <button
            className='btn col-span-1'
            onClick={handleAgeConfirmation(true)}
          >
            Enter
          </button>
          <button
            className='btn-outline btn col-span-1'
            onClick={handleAgeConfirmation(false)}
          >
            Back
          </button>
        </div>
        <div className='absolute bottom-3 text-2xl uppercase'>
          <span className='font-extrabold'>Size</span>
          <span className='font-thin'>Con</span>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-[100dvh] w-full flex-col'>
      <div className='navbar fixed z-50 bg-neutral px-3 text-neutral-content shadow-md'>
        <img className='m-auto h-12' src={app_logo_src} alt='SizeCon 2023' />
      </div>
      <div className='navbar' />
      <div className='mx-auto my-0 w-full max-w-screen-lg p-4'>
        {<Outlet />}
        <div className='mt-4 w-full text-center'>
          <div className='text-sm'>Copyright &copy; 2023 SizeCon</div>
          <div className='text-xs'>All rights reserved.</div>
        </div>
      </div>
      <div className='navbar' />
      <div className='btm-nav z-50 bg-neutral text-primary'>
        {routes.map(nav => {
          const isMatch = location.pathname === nav.path
          return (
            <Link
              className={clsx(
                'bg-transparent text-sm',
                isMatch && 'active font-medium'
              )}
              key={nav.title}
              to={nav.path}
            >
              <nav.icon className='h-6 w-6' />
              <span className='btm-nav-label'>{nav.title}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default MainLayout
