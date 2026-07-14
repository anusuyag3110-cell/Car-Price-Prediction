import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Predict from './pages/Predict'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Chat from './pages/Chat'

export default function App(){
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <nav className="bg-white/90 backdrop-blur sticky top-0 z-40 shadow-sm">
        <div className="container px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-bold">AS</div>
            <div className="text-xl font-semibold text-primary">AutoSmart</div>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/predict" className="text-sm text-primary">Predict Price</Link>
            <Link to="/dashboard" className="text-sm text-primary">Dashboard</Link>
            <Link to="/about" className="text-sm text-primary">About</Link>
            <Link to="/chat" className="text-sm text-primary">AI Chat</Link>
          </div>
        </div>
      </nav>
      <main className="container px-6 py-10">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/predict" element={<Predict/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </main>
    </div>
  )
}
