import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HeartPulse,
  Shield,
  Stethoscope,
  Activity,
  UserPlus,
  UserCog,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("doctor");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    const result = register(email, password, role);
    if (!result.success) {
      setError(result.message);
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Account created successfully. Redirecting to login...");

    setTimeout(() => {
      navigate("/login");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 overflow-hidden relative px-4 py-8">
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[32px] shadow-2xl border border-white/10 backdrop-blur-xl">
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-cyan-600 to-sky-500 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                <HeartPulse className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">LIFELINE</h1>
                <p className="text-white/80 text-sm">
                  Hospital Management System
                </p>
              </div>
            </div>

            <div className="max-w-md">
              <h2 className="text-5xl font-bold leading-tight">
                Create your hospital access
              </h2>
              <p className="text-white/80 mt-5 text-lg leading-8">
                Register a secure account for staff, doctors, or admins and then
                sign in to manage patients, doctors, and appointments.
              </p>
            </div>

            <div className="mt-12 space-y-5">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Shield size={22} />
                </div>
                <div>
                  <p className="font-semibold">Secure Access</p>
                  <p className="text-sm text-white/70">
                    Accounts are protected and stored locally.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Activity size={22} />
                </div>
                <div>
                  <p className="font-semibold">Fast Setup</p>
                  <p className="text-sm text-white/70">
                    Create your account in seconds and start using the
                    dashboard.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Stethoscope size={22} />
                </div>
                <div>
                  <p className="font-semibold">Team Roles</p>
                  <p className="text-sm text-white/70">
                    Choose the role that matches your hospital responsibilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 text-sm text-white/70">
            © 2026 Lifeline Hospital
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl mb-5">
                <HeartPulse className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">LIFELINE</h1>
              <p className="text-gray-500 mt-2">Hospital Management System</p>
            </div>

            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-5">
                <UserPlus size={16} /> Create Account
              </div>

              <h2 className="text-4xl font-bold text-gray-900">
                Register Your Account
              </h2>
              <p className="text-gray-500 mt-3 leading-7">
                Only users with an account can sign in. If you do not have one,
                create it now.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 p-4 bg-green-50 border border-green-200 text-green-600 rounded-2xl text-sm font-medium">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@hospital.com"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 cursor-pointer"
                >
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 hover:from-blue-700 hover:via-cyan-600 hover:to-sky-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer"
              >
                <UserPlus size={20} /> Create Account
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
