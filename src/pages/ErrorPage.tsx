import Page from 'components/Page'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
  return (
    <Page className='flex h-[100dvh] w-full flex-col items-center justify-center space-y-4 bg-primary p-8 text-primary-content'>
      <h2 className='text-8xl font-extrabold'>404</h2>
      <p className='text-center text-2xl font-semibold'>
        The page you were looking for does not exist.
      </p>
      <Link className='link' to='/'>
        Home
      </Link>
    </Page>
  )
}

export default ErrorPage
