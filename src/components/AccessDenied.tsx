import { FC } from 'react'

const AccessDenied: FC = () => {
  return (
    <div className='flex h-[100dvh] w-full flex-col items-center justify-center p-8'>
      <div className='mb-4 text-center text-3xl font-bold'>
        ENTER ONLY IF YOU ARE OVER 18
      </div>
      <div className='mb-5 text-lg'>
        Website contains content of adult nature and is only available to
        adults. If you are under the age of 18 (or 21 in some countries), if it
        is illegal to view such material in your jurisdiction or it offends you,
        please do not continue.
      </div>
      <div className='text-xl text-primary'>
        <span>Size</span>Con
      </div>
    </div>
  )
}

export default AccessDenied
