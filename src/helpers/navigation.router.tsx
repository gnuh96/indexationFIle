import Root from '@/routes/Root'
import Search from '@/routes/Search'
import {createBrowserRouter} from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [],
  },
  {
    path: '/search',
    element: <Search />,
    children: [],
  },
])
