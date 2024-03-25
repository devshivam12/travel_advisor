import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/user_data/Login'
import Signup from './components/user_data/Signup'
const App = () => {
  return (
    <>
       <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/home' element={<Home />}/>
          </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
