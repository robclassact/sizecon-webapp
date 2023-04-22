import MainLayout from 'components/MainLayout'
import { AnimatePresence } from 'framer-motion'
import BookmarksPage from 'pages/BooksmarksPage'
import ErrorPage from 'pages/ErrorPage'
import EventsPage from 'pages/EventsPage'
import GuestsPage from 'pages/GuestsPage'
import HomePage from 'pages/HomePage'
import { FC } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

const App: FC = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode='wait' initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='events' element={<EventsPage />} />
          <Route path='guests' element={<GuestsPage />} />
          <Route path='bookmarks' element={<BookmarksPage />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
