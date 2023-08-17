import React from 'react'
import './App.css'
import Layout from './Layout'
import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvide } from './UserContext'
import CretatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'

const App = () => {
  return (
    <UserContextProvide>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<IndexPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/create' element={<CretatePost />} />
      <Route path='/post/:id' element={<PostPage />} />
      <Route path='/edit/:id' element={<EditPost />} />
      </Route>
    </Routes>
    </UserContextProvide>
  )
}

export default App