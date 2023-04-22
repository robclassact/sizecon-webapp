import { FC, PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

type Props = {
  className?: string
} & PropsWithChildren

const Page: FC<Props> = ({ className, children }) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -15, opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export default Page
