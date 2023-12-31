import React  from 'react'
import './App.css'
import Layout from './Layout'
import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { UserContextProvide } from './UserContext'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import EditPost from './pages/EditPost'
import AuthorPage from './pages/AuthorPage'
import PrivateRoute from './PrivateRoute'

const App = () => {;
  return (
    <UserContextProvide>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<IndexPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      {/* <Route path='/create' element={<CreatePost />} /> */}
      {/* <Route path = '/create' element={<PrivateRoute><CreatePost /></PrivateRoute>} /> */}

      <Route path="/create" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
      <Route path='/post/:id' element={<PostPage />} />
      <Route path='/edit/:id' element={<EditPost />} />
      <Route path='/author/:username' element={<AuthorPage />} />
      {/* <Route path='/profile' element={<ProfilePage />} /> */}
      </Route>
    </Routes>
    </UserContextProvide>
  )
}

export default App