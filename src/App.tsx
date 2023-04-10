import { FC } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MainLayout from 'components/MainLayout'
import GuestsPage from 'features/guest/GuestsPage'
import EventsPage from 'features/event/EventsPage'
import BookmarksPage from 'features/bookmark/BooksmarksPage'
import HomePage from 'features/home/HomePage'

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
        <Route path='*' element={<div>Error</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
