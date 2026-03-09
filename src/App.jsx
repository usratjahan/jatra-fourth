import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import Explore from './pages/Explore'
import Family from './components/Community/Family'
import Male from './components/Community/Male'
import Female from './components/Community/Female'
import Combined from './components/Community/Combined'
import ContactUs from './pages/ContactUs'
import DashboardLayout from './components/Dashboard/DashboardLayout'
import ProfilePage from './components/Dashboard/ProfilePage'
import BookingHistory from './components/Dashboard/BookingHistory'
import UpdateProfile from './components/Dashboard/UpdateProfile'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      {/* define routes so <Link> and useLocation work */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/community/family" element={<Family />} />
        <Route path="/community/male" element={<Male />} />
        <Route path="/community/female" element={<Female />} />
        <Route path="/community/combined" element={<Combined />} />

        {/* ── ADD FOR PROFILE ──────────────────────────── */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index             element={<Navigate to="/dashboard/profile" replace />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="bookings" element={<BookingHistory />} />
          <Route path="profile/edit" element={<UpdateProfile/>}/>
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
