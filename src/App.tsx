import { StrictMode } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import SignIn from './pages/SignIn/SignIn'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

const App: React.FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          
          {/* Private routes 
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>
          */}
        </Routes>
      </BrowserRouter>
    </StrictMode>
)}

export default App
