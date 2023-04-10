import { FC } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineSparkles,
  // HiOutlineMapPin,
  HiOutlineBookmarkSquare
} from 'react-icons/hi2'
import clsx from 'clsx'

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
  },
  // {
  //   path: '/floor-map',
  //   title: 'Map',
  //   icon: HiOutlineMapPin
  // },
  {
    path: '/bookmarks',
    title: 'Bookmarks',
    icon: HiOutlineBookmarkSquare
  }
]

const MainLayout: FC = () => {
  const location = useLocation()

  return (
    <div className='flex h-[100dvh] w-full flex-col'>
      <div className='navbar fixed z-50 bg-neutral px-5 text-neutral-content shadow-md'>
        <div className='text-3xl uppercase text-primary'>
          <span className='font-extrabold'>Size</span>
          <span className='font-thin'>Con</span>
        </div>
      </div>
      <div className='navbar' />
      <div className='mx-auto my-0 w-full max-w-screen-lg p-4'>
        {<Outlet />}
      </div>
      <div className='navbar' />
      <div className='btm-nav z-50 bg-neutral text-primary shadow-md'>
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
