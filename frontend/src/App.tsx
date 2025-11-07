import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import Cart from './pages/Cart'
import Payment from './pages/Payment'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/payment' element={<Payment />} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
