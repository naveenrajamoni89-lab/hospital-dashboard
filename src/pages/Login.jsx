import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  HeartPulse,
  LogIn,
  Shield,
  Stethoscope,
  Activity,
  UserCog,
} from "lucide-react";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState(
    "admin@hospital.com"
  );

  const [password, setPassword] =
    useState("password");

  const [role, setRole] = useState("admin");

  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    login(email, role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 overflow-hidden relative px-4 py-8">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[32px] shadow-2xl border border-white/10 backdrop-blur-xl">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-cyan-600 to-sky-500 p-10 text-white relative overflow-hidden">

          {/* GLOW */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            {/* LOGO */}
            <div className="flex items-center gap-4 mb-10">

              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">

                <HeartPulse className="w-8 h-8 text-white" />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  LIFELINE
                </h1>

                <p className="text-white/80 text-sm">
                  Hospital Management
                  System
                </p>
              </div>
            </div>

            {/* HERO TEXT */}
            <div className="max-w-md">

              <h2 className="text-5xl font-bold leading-tight">
                Smart Healthcare Dashboard
              </h2>

              <p className="text-white/80 mt-5 text-lg leading-8">
                Manage patients, doctors,
                appointments, and hospital
                operations with a modern and
                intelligent platform.
              </p>
            </div>

            {/* FEATURES */}
            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">

                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Shield size={22} />
                </div>

                <div>
                  <p className="font-semibold">
                    Secure Access
                  </p>

                  <p className="text-sm text-white/70">
                    Protected hospital data
                    and authentication
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">

                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Activity size={22} />
                </div>

                <div>
                  <p className="font-semibold">
                    Real-Time Monitoring
                  </p>

                  <p className="text-sm text-white/70">
                    Track appointments and
                    critical patients live
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">

                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Stethoscope size={22} />
                </div>

                <div>
                  <p className="font-semibold">
                    Doctor Management
                  </p>

                  <p className="text-sm text-white/70">
                    Efficiently manage staff
                    and departments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="relative z-10 mt-10 text-sm text-white/70">
            © 2026 Lifeline Hospital
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-10 flex items-center justify-center">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <div className="lg:hidden text-center mb-8">

              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl mb-5">

                <HeartPulse className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                LIFELINE
              </h1>

              <p className="text-gray-500 mt-2">
                Hospital Management System
              </p>
            </div>

            {/* TITLE */}
            <div className="mb-8">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-5">

                <UserCog size={16} />

                Secure Login Portal
              </div>

              <h2 className="text-4xl font-bold text-gray-900">
                Welcome Back
              </h2>

              <p className="text-gray-500 mt-3 leading-7">
                Sign in to access the
                hospital dashboard and manage
                healthcare operations.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium">
                {error}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={e =>
                    setEmail(e.target.value)
                  }
                  placeholder="doctor@hospital.com"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                />
              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={e =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="••••••••"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                />
              </div>

              {/* ROLE */}
              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Login Role
                </label>

                <select
                  value={role}
                  onChange={e =>
                    setRole(e.target.value)
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 cursor-pointer"
                >
                  <option value="admin">
                    Admin
                  </option>

                  <option value="doctor">
                    Doctor
                  </option>

                  <option value="staff">
                    Staff
                  </option>
                </select>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 hover:from-blue-700 hover:via-cyan-600 hover:to-sky-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer"
              >
                <LogIn size={20} />

                Sign In
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-8 text-center">

              <p className="text-sm text-gray-400">
                Protected Hospital Access •
                Secure Authentication
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}