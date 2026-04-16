import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import NotFoundPage from './pages/notFoundPage'
import NavBar from './components/global/NavBar'

function App() {
  return (
    <>
      <div>
        <NavBar></NavBar>
        <Routes>
          <Route
            path="/"
            element ={<HomePage></HomePage>}
          />
          <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
