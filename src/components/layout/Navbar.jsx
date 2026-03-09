import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SignIn from '../shared/Signin';
import SignUp from '../shared/SignUp';
import logo from '../../assets/images/Logo.png';
import { ArrowLeftIcon, X } from "lucide-react";

const   Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [authStep, setAuthStep] = useState('role');
  const [selectedRole, setSelectedRole] = useState('');
  const communityRef = useRef(null);
  const location = useLocation();

  // Sticky header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (communityRef.current && !communityRef.current.contains(e.target)) {
        setCommunityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when modal/mobile menu open
  useEffect(() => {
    document.body.style.overflow = (loginModalOpen || mobileMenuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [loginModalOpen, mobileMenuOpen]);

  const communityOptions = [
    { label: 'Family', href: '/community/family' },
    { label: 'Male', href: '/community/male'},
    { label: 'Female', href: '/community/female' },
    { label: 'Combined', href: '/community/combined'},
  ];

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Explore', href: '/explore' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const isActive = (href) => location.pathname === href;

  const openLoginFlow = () => {
    setLoginModalOpen(true);
    setAuthStep('role');
    setActiveTab('signin');
    setSelectedRole('');
  };

  const closeLoginFlow = () => {
    setLoginModalOpen(false);
    setAuthStep('role');
    setActiveTab('signin');
    setSelectedRole('');
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setAuthStep('auth');
    setActiveTab('signin');
  };

  const roleTitle = selectedRole ? `${selectedRole} Account` : 'Account';

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled
            ? 'bg-[#0F393E]/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-[#0F393E]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── LOGO ── */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src={logo}
                alt="Jatra"
                className="h-13 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div
                className="hidden w-10 h-10 bg-green-500 rounded-full items-center justify-center text-white font-bold text-lg"
                style={{ display: 'none' }}
              >
                J
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden lg:flex items-center gap-1">

              {/* Home */}
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive('/') ? 'text-green-400 bg-green-400/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
              >
                Home
              </Link>

              {/* Choose Community Dropdown */}
              <div className="relative" ref={communityRef}>
                <button
                  onClick={() => setCommunityOpen(!communityOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${communityOpen ? 'text-green-400 bg-green-400/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                >
                  <span>Choose Community</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${communityOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {communityOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-gray-800 rounded-xl shadow-xl shadow-black/30 border border-white/10 overflow-hidden z-50">
                    {communityOptions.map((opt) => (
                      <Link
                        key={opt.label}
                        to={opt.href}
                        onClick={() => setCommunityOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-green-500/20 transition-all duration-150"
                      >
                        <span className="text-lg">{opt.icon}</span>
                        <span className="font-medium">{opt.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Nav Links */}
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(link.href) ? 'text-green-400 bg-green-400/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── LOGIN BUTTON ── */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={openLoginFlow}
                className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25 active:scale-95"
              >
                Login
              </button>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          className={`lg:hidden bg-[#0F393E] border-t border-white/10 overflow-hidden transition-all duration-300
            ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-4 py-4 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
            >
              Home
            </Link>

            {/* Mobile Community */}
            <div>
              <button
                onClick={() => setCommunityOpen(!communityOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
              >
                <span>Choose Community</span>
                <svg className={`w-4 h-4 transition-transform ${communityOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {communityOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-green-500/30 pl-4">
                  {communityOptions.map((opt) => (
                    <Link
                      key={opt.label}
                      to={opt.href}
                      onClick={() => { setCommunityOpen(false); setMobileMenuOpen(false); }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 pb-1">
              <button
                onClick={() => { openLoginFlow(); setMobileMenuOpen(false); }}
                className="w-full py-3 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── LOGIN MODAL ── */}
      {loginModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeLoginFlow(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />

          {/* Modal Box */}
          <div className="relative bg-[#0F393E] rounded-2xl shadow-2xl w-full max-w-md border border-white/10 overflow-hidden">

            {/* Close Button */}
            <button
              onClick={closeLoginFlow}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 cursor-pointer text-gray-400 hover:text-white transition-colors z-10"
            >
              <X />
            </button>

            {authStep === 'role' && (
              <div className="p-8 pt-14 text-center">
                <h2 className="text-4xl font-semibold text-white">Login to Your Account</h2>
                <p className="mt-3 text-xl text-gray-300">Please select how you want to continue</p>

                <div className="mt-8 space-y-5">
                  <button
                    onClick={() => handleRoleSelect('User')}
                    className="w-full rounded-xl bg-white/95 py-2 text-3xl text-emerald-700 hover:bg-white transition-colors"
                  >
                    USER
                  </button>

                  <p className="text-2xl text-white">OR</p>

                  <button
                    onClick={() => handleRoleSelect('Agent')}
                    className="w-full rounded-xl bg-white/95 py-2 text-3xl text-emerald-700 hover:bg-white transition-colors"
                  >
                    AGENT
                  </button>
                </div>
              </div>
            )}

            {authStep === 'auth' && (
              <>
                <div className="px-6 pt-6 pb-2 border-b border-white/10">
                  <button
                    onClick={() => setAuthStep('role')}
                    className="text-xs flex gap-2  font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-200 cursor-pointer transition-colors"
                  >
                    <ArrowLeftIcon size={16}/>

                    Back to role selection
                  </button>
                  <p className="mt-2 text-sm text-green-400 font-medium">{roleTitle}</p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10">
                  <button
                    onClick={() => setActiveTab('signin')}
                    className={`flex-1 py-4 text-sm font-semibold hover:cursor-pointer transition-all duration-200
                      ${activeTab === 'signin'
                        ? 'text-green-400 border-b-2 border-green-400 bg-green-400/5'
                        : 'text-gray-400 hover:text-gray-200'}`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab('signup')}
                    className={`flex-1 py-4 text-sm font-semibold hover:cursor-pointer transition-all duration-200
                      ${activeTab === 'signup'
                        ? 'text-green-400 border-b-2 border-green-400 bg-green-400/5'
                        : 'text-gray-400 hover:text-gray-200'}`}
                  >
                    Sign Up
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === 'signin' && (
                    <SignIn
                      role={selectedRole}
                      onSwitchToSignup={() => setActiveTab('signup')}
                    />
                  )}

                  {activeTab === 'signup' && (
                    <SignUp
                      role={selectedRole}
                      onSwitchToSignin={() => setActiveTab('signin')}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
