import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import AuthLayout from './layouts/AuthLayout'

const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<AuthLayout><Login/></AuthLayout>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App