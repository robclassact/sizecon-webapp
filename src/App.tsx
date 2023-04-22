import { FC } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MainLayout from 'components/MainLayout'
import GuestsPage from 'pages/GuestsPage'
import EventsPage from 'pages/EventsPage'
import BookmarksPage from 'pages/BooksmarksPage'
import HomePage from 'pages/HomePage'
import ErrorPage from 'pages/ErrorPage'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='events' element={<EventsPage />} />
          <Route path='guests' element={<GuestsPage />} />
          <Route path='bookmarks' element={<BookmarksPage />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
