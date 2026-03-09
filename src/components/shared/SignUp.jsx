import React, { useState } from 'react';

const SignUp = ({ onSwitchToSignin, role }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const roleLabel = role || 'User';

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1">Join the Jatra community as {roleLabel}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name</label>
            <input
              type="text"
              placeholder="John"
              className="w-full px-4 py-3 bg-white border border-white/10 rounded-lg text-black text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full px-4 py-3 bg-white border border-white/10 rounded-lg text-black text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-white border border-white/10 rounded-lg text-black text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone</label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 bg-white border border-white/10 rounded-lg text-black text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              className="w-full px-4 py-3 bg-white border border-white/10 rounded-lg text-black text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Terms checkbox */}
        <div className="flex items-start gap-3 mt-2">
          <input
            type="checkbox"
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
            className="mt-1 w-4 h-4 accent-green-500 cursor-pointer"
          />

          <p className="text-gray-400 text-sm leading-6">
            I have read and accept the{" "}
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              Terms and Conditions
            </button>
          </p>
        </div>

        <button
          type="submit"
          disabled={!accepted}
          className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-200 mt-2 ${
            accepted
              ? 'bg-green-500 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/25 active:scale-95'
              : 'bg-gray-600 cursor-not-allowed opacity-70'
          }`}
        >
          Create {roleLabel} Account
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignin}
            className="text-green-400 hover:text-green-300 font-medium transition-colors"
          >
            Sign In
          </button>
        </p>
      </form>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-gray-900 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h2 className="text-xl font-bold">Terms and Conditions</h2>
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-5 text-sm text-gray-300 space-y-4 leading-7">
              <p>
                Welcome to Jatra. By accessing or using this website, you agree to
                follow the terms and conditions described below. These terms apply
                to all users, including visitors, registered users, agents, and
                community partners.
              </p>

              <div>
                <h3 className="font-semibold text-white">1. User Registration</h3>
                <p>
                  To use certain features of the platform, users may be required
                  to create an account. Users must provide accurate and complete
                  information during registration. The user is responsible for
                  maintaining the confidentiality of their account and password.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">2. Tour Booking</h3>
                <p>
                  Users can explore and book available tour packages through the
                  platform. All bookings are subject to availability.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">3. Payments</h3>
                <p>
                  Payments must be completed through the approved payment methods
                  provided on the platform. The platform reserves the right to
                  cancel bookings if payment is not completed within the required
                  time.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  4. Minimum Participant Requirement
                </h3>
                <p>
                  Each event or tour requires a minimum number of participants to
                  take place. If the required number of participants is not reached
                  within the specified time, the event may be postponed or
                  cancelled. In such cases, users will be notified in advance and
                  may choose to join another available event or receive a refund
                  according to the platform’s refund policy. Once the minimum
                  participant requirement is fulfilled, the event will be organized
                  as scheduled.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  5. Cancellation and Refund Policy
                </h3>
                <p>
                  Users may cancel their bookings according to the cancellation
                  policy mentioned in each tour package. Refunds, if applicable,
                  will be processed based on the rules defined by the platform or
                  the tour agent.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">6. User Responsibilities</h3>
                <p>
                  Users must behave respectfully towards local communities, guides,
                  and other travelers during tours. Any illegal, harmful, or
                  disrespectful behavior may lead to account suspension or
                  cancellation of bookings.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">7. Agent Responsibilities</h3>
                <p>
                  Agents who provide tour packages must ensure that the information
                  they provide is accurate and reliable. Agents are responsible for
                  the quality and safety of the tours they organize.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">8. Limitation of Liability</h3>
                <p>
                  The platform acts as a facilitator connecting users and agents.
                  While we try to ensure quality services, we are not responsible
                  for any personal injury, loss, or damage occurring during tours.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">9. Changes to Terms</h3>
                <p>
                  The platform reserves the right to update or modify these terms
                  and conditions at any time. Continued use of the platform after
                  changes indicates acceptance of the updated terms.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">10. Contact Information</h3>
                <p>
                  If you have any questions regarding these Terms and Conditions,
                  please contact us through the contact page of the website.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setAccepted(true);
                  setShowTerms(false);
                }}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-white font-medium"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;