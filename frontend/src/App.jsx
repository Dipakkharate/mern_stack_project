import React from 'react'
import Infinite from './Infinite'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Pagination from './Paginate'
import Login from './Login'
export default function App() {
  return (

    <>
      <BrowserRouter>
        <ul>
          <li><Link to="/">Pagination</Link></li>
          <li><Link to="/infinite">Infinite</Link></li>
          <li><Link to="/login">Login</Link></li>

        </ul>

        <Routes>
          <Route path='/' element={<Pagination />} />
          <Route path='/infinite' element={<Infinite />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
