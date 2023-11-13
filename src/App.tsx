import './App.css'
import {RouterProvider} from 'react-router-dom'
import {router} from './helpers/navigation.router'

function App() {
  return <RouterProvider router={router} />
}

export default App
