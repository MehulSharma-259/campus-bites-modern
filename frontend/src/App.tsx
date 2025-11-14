import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import { Profile } from './pages/Profile'
import { ProtectedRoutes } from './components/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
    <Routes>

      {/* Public routes */}
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />

      {/* Private routes */} 
      <Route element={<ProtectedRoutes/>} >
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/profile' element={<Profile />} />
      </Route>

    </Routes>
    </BrowserRouter>

  )
}

export default App
