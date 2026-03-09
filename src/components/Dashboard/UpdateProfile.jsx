import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// TODO: GET /api/auth/me  — prefill existing values
// TODO: PUT /api/auth/profile — update profile
// Body: { firstName, lastName, email, phone, address, newPassword, confirmPassword }

const BD_CODE = "+880";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Prefill form with existing profile data
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // TODO: const res  = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        // TODO: const data = await res.json();
        // TODO: setForm(prev => ({ ...prev, firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone, address: data.address }));
        await new Promise((r) => setTimeout(r, 400));
        // Mock prefill
        setForm((p) => ({ ...p, email: "you@gmail.com" }));
      } catch (err) {
        console.error("Prefill failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setErrMsg("Passwords do not match.");
      return;
    }

    setStatus("loading");
    try {
      // TODO: Replace with real API call
      // const res  = await fetch('/api/auth/profile', {
      //   method:  'PUT',
      //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      //   body:    JSON.stringify({
      //     firstName:       form.firstName,
      //     lastName:        form.lastName,
      //     email:           form.email,
      //     phone:           form.phone,
      //     address:         form.address,
      //     newPassword:     form.newPassword || undefined,
      //     confirmPassword: form.confirmPassword || undefined,
      //   }),
      // });
      // if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      setTimeout(() => navigate("/dashboard/profile"), 1200);
    } catch (err) {
      setErrMsg(err.message || "Update failed. Please try again.");
      setStatus("error");
    }
  };

  const inputCls =
    "w-full bg-white text-gray-800 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors";
  const labelCls = "block text-white text-xs font-semibold mb-1.5";

  if (loading)
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-white/10 rounded w-40 mb-8" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-16 bg-white/10 rounded-xl" />
          ))}
        </div>
      </div>
    );

  return (
    <div>
      <h1 className="text-white font-bold text-3xl mb-8">Update Profile</h1>

      <form onSubmit={handleSubmit}>
        {/* 3-column grid — matches design exactly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {/* First Name */}
          <div>
            <label className={labelCls}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              className={inputCls}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className={labelCls}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className={inputCls}
            />
          </div>

          {/* New Password */}
          <div>
            <label className={labelCls}>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="New password"
              className={inputCls}
            />
          </div>

          {/* Email Address */}
          <div>
            <label className={labelCls}>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@gmail.com"
              className={inputCls}
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className={labelCls}>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className={inputCls}
            />
          </div>

          {/* Phone Number — BD flag + code prefix */}
          <div className="sm:col-start-1">
            <label className={labelCls}>Phone Number</label>
            <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-colors">
              {/* BD flag + code */}
              <div className="flex items-center gap-1.5 px-3 border-r border-gray-200 bg-gray-50 h-full py-2.5 flex-shrink-0">
                {/* 🇧🇩 flag emoji */}
                <span className="text-base leading-none">🇧🇩</span>
                <span className="text-gray-600 text-xs font-semibold">BD</span>
                {/* Lucide ChevronDown */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6B7280"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="17xxxxxxxx"
                className="flex-1 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className={labelCls}>Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Your address"
              className={inputCls}
            />
          </div>
        </div>

        {/* Error / success messages */}
        {errMsg && (
          <p className="text-red-400 text-sm mb-4 font-medium">✗ {errMsg}</p>
        )}
        {status === "success" && (
          <p className="text-green-400 text-sm mb-4 font-medium">
            ✓ Profile updated! Redirecting...
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-8 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {status === "loading" ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Saving...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
