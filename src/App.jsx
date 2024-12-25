import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import UsersList from './pages/UsersList'
import ProtectedRoute from './protected/ProtectedRoute'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/userlist" element={
            <ProtectedRoute element={<UsersList />} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
