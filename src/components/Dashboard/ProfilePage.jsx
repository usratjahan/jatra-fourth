import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// TODO: GET /api/auth/me
// Response: { fullName, email, phone, address }
const MOCK_PROFILE = {
  fullName: "Jennifer Lawrence",
  email: "you@gmail.com",
  phone: "017xxxxxxxxx",
  address: "Mohammadpur, Dhaka",
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // TODO: const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        // TODO: const data = await res.json(); setProfile(data);
        await new Promise((r) => setTimeout(r, 500));
        setProfile(MOCK_PROFILE);
      } catch (err) {
        console.error("Profile fetch failed:", err);
        setProfile(MOCK_PROFILE);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-white/10 rounded w-32 mb-8" />
        <div className="bg-white/10 rounded-2xl h-56" />
      </div>
    );

  return (
    <div>
      <h1 className="text-white font-semibold text-5xl mb-8">Profile Information</h1>

      {/* Info card — teal glass */}
      <div
        className="rounded-2xl bg-gradient-to-b from-[#2897A4]/[0.41] to-transparent rounded-2xl p-8 shadow-[0_12px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]"
        // style={{
        //   background: "rgba(15,57,62,0.7)",
        //   border: "1px solid rgba(255,255,255,0.08)",
        // }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-26 p-5 gap-y-7">
          {/* Full Name */}
          <div>
            <p className="text-white/60 text-md mb-1">Full Name</p>
            {/* TODO: from GET /api/auth/me → fullName */}
            <p className="text-white font-semibold text-2xl">{profile.fullName}</p>
          </div>

          {/* Address */}
          <div className="sm:row-span-4">
            <p className="text-white/60 text-md mb-1">Address</p>
            {/* TODO: from GET /api/auth/me → address */}
            <p className="text-white font-semibold text-2xl">{profile.address}</p>
          </div>

          {/* Email */}
          <div>
            <p className="text-white/60 text-md mb-1">Email Address</p>
            {/* TODO: from GET /api/auth/me → email */}
            <p className="text-white font-semibold text-2xl">{profile.email}</p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-white/60 text-md mb-1">Phone Number</p>
            {/* TODO: from GET /api/auth/me → phone */}
            <p className="text-white font-semibold text-2xl">{profile.phone}</p>
          </div>
        </div>
      </div>

      {/* Update Profile button */}
      <button
        onClick={() => navigate("/dashboard/profile/edit")}
        className="mt-8 px-7 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 active:scale-95"
      >
        Update Profile
      </button>
    </div>
  );
};

export default ProfilePage;
