import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Playlists from '../pages/Playlists'
import Browse from '../pages/Browse'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </BrowserRouter>
  )
}
