import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useHospital } from '../../context/HospitalContext'
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Shield,
  Stethoscope,
} from 'lucide-react'

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const { appointments } = useHospital()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const pendingCount = appointments.filter(a => a.status === 'Pending').length
  const isAdmin = user?.role === 'admin'

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer">
          <Menu size={22} />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search patients, doctors..." className="pl-10 pr-4 py-2 w-64 lg:w-80 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <Bell size={20} />
            {pendingCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{pendingCount}</span>
            )}
          </button>
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Notifications</p>
                </div>
                <div className="p-3">
                  {pendingCount > 0 ? (
                    <p className="text-sm text-gray-600">{pendingCount} pending appointment{pendingCount > 1 ? 's' : ''} need attention</p>
                  ) : (
                    <p className="text-sm text-gray-400">No new notifications</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
              <div className="flex items-center gap-1">
                {isAdmin ? <Shield size={10} className="text-blue-500" /> : <Stethoscope size={10} className="text-green-500" />}
                <p className="text-xs text-gray-400 capitalize">{user?.role || 'user'}</p>
              </div>
            </div>
            <ChevronDown size={16} className="text-gray-400 hidden md:block" />
          </button>
          {showProfile && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700">
                  <User size={16} /> Profile
                </div>
                <hr className="border-gray-100" />
                <button onClick={() => { logout(); setShowProfile(false) }} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-lg cursor-pointer">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
