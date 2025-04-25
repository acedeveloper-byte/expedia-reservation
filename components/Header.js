'use client'
import React, { useState } from 'react'
import "../app/globals.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  return (
    <header className="">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <a href="/"><img src="/logo.png" alt='logo' className='logo-layout' /></a>

        {/* Desktop Menu */}
        <div className="d-none d-md-flex align-items-center gap-4">
          <nav>
            <ul className="list-unstyled d-flex gap-4 m-0 mx-4 fw-medium">
              <li><a href="#" className="text-dark text-decoration-none">Flight</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Hotel</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Packages</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Cruise</a></li>
            </ul>
          </nav>

          {/* Call to Action Button */}
          <a href="#" className="btn btn-primary rounded-pill px-4 fw-semibold">
            Book Now
          </a>
        </div>

        {/* Hamburger Icon (Mobile Only) */}
        <button className="btn btn-outline-light d-md-none mob-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="d-md-none bg-dark">
          <ul className="list-unstyled p-3 m-0 fw-medium">
            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Flight</a></li>
            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Hotel</a></li>
            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Packages</a></li>
            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Cruise</a></li>
            <li><a href="/contact-us" className="btn btn-primary w-100 mt-3">Book Now</a></li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
