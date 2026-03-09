import {
  LucideClock,
  LucideLogOut,
  LucideUserCircle,
  UserCircle,
} from "lucide-react";
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

// TODO: GET /api/auth/me  → { id, username, avatar, fullName, email, phone, address }
const MOCK_USER = {
  username: "User Name",
  avatar: null, // set to image URL when available
};

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Call POST /api/auth/logout, clear token/session, then redirect
    // await fetch('/api/auth/logout', { method: 'POST' });
    // localStorage.removeItem('token');
    navigate("/");
  };

  const navCls = ({ isActive }) =>
    `flex items-center gap-3 text-sm font-medium px-2 py-2 rounded-lg transition-colors ${
      isActive ? "text-green-400" : "text-white/80 hover:text-white"
    }`;

  return (
    <div
      className="min-h-screen pt-16"
      //   style={{
      //     background:
      //       "linear-gradient(160deg,#0a2a2e 0%,#0d3d42 40%,#0f4a50 100%)",
      //   }}
    >
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* ══════════════════════════
            LEFT SIDEBAR
        ══════════════════════════ */}
        <aside
          className="w-90 flex-shrink-0 border-r border-white/10 flex flex-col items-center py-10 px-5"
          style={{
            background: "linear-gradient(180deg, #2897A4 0%, #0F393E 91%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Avatar */}
          <div className="w-25 h-25 rounded-full bg-[#0f393e]   flex items-center justify-center mb-3 overflow-hidden">
            {MOCK_USER.avatar ? (
              <img
                src={MOCK_USER.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              // Lucide UserCircle
              <LucideUserCircle 
              size={70} 
              color={"white"}
              />
            )}
          </div>

          {/* User badge + username */}
          <span className="bg-teal-700 text-white text-md font-semibold px-3 py-0.5 rounded-full mb-1">
            User
          </span>
          {/* TODO: Replace with real username from auth context / /api/auth/me */}
          <p className="text-white font-semibold  text-md mb-8">
            {MOCK_USER.username}
          </p>

          {/* Nav links */}
          <nav className="w-full  space-y-5">
            <NavLink to="/dashboard/profile" end className={navCls}>
              {({ isActive }) => (
                <div className="flex items-center gap-4">
                  <UserCircle
                    size={28}
                    stroke={isActive ? "#4ade80" : "currentColor"}
                  />
                  <span className="text-2xl font-medium">Personal Information</span>
                </div>
              )}
            </NavLink>

            <NavLink to="/dashboard/bookings" className={navCls}>
              {({ isActive }) => (
                <div className="flex items-center gap-4">
                  <LucideClock
                    size={28}
                    stroke={isActive ? "#4ade80" : "currentColor"}
                  />
                  <span className="text-2xl font-medium">Bookings</span>
                </div>
              )}
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-sm font-medium px-2 py-2 rounded-lg text-white/80 hover:text-white cursor-pointer transition-colors w-full"
            >
              <LucideLogOut size={28} />
              <span className="text-2xl font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {/* ══════════════════════════
            MAIN CONTENT AREA
        ══════════════════════════ */}
        <main
          className="flex-1 p-50  lg:p-20"
          style={{
            background: "linear-gradient(180deg, #127A88 31%, #0D555F 87%)",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
