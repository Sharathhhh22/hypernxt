import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Eligibility from './pages/Eligibility'
import Dashboard from './pages/Dashboard'
import PageLoader from './components/PageLoader'

function App() {
  return (
    <BrowserRouter>
      <PageLoader>
        <div className="min-h-screen bg-background selection:bg-primary/30">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="eligibility" element={<Eligibility />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </PageLoader>
    </BrowserRouter>
  )
}

export default App
