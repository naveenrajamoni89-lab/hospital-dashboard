import { useState, useEffect } from 'react'
import { useHospital } from '../context/HospitalContext'
import StatsGrid from '../components/dashboard/StatsGrid'
import RecentActivity from '../components/dashboard/RecentActivity'
import TodaySchedule from '../components/dashboard/TodaySchedule'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { Calendar, AlertTriangle } from 'lucide-react'

export default function Dashboard() {
  const { getDashboardStats, patients, loading } = useHospital()
  const [stats, setStats] = useState(null)
  const [refreshTick, setRefreshTick] = useState(0)

  useEffect(() => {
    if (!loading) {
      setStats(getDashboardStats())
    }
  }, [getDashboardStats, loading])

  useEffect(() => {
    if (loading) return
    const interval = setInterval(() => {
      setRefreshTick(t => t + 1)
      setStats(getDashboardStats())
    }, 10000)
    return () => clearInterval(interval)
  }, [getDashboardStats, loading])

  useEffect(() => {
    if (!loading) {
      setStats(getDashboardStats())
    }
  }, [refreshTick]) // eslint-disable-line react-hooks/exhaustive-deps

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  if (loading || !stats) return <LoadingSpinner size="lg" />

  const criticalPatients = patients.filter(p => p.status === 'Critical' && !p.dischargeStatus)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
          <Calendar size={14} /> {today}
        </p>
      </div>

      <StatsGrid stats={stats} />

      {criticalPatients.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle size={20} className="text-red-500 shrink-0 animate-pulse" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">
              {criticalPatients.length} critical patient{criticalPatients.length > 1 ? 's' : ''} require immediate attention
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              {criticalPatients.map(p => `${p.name} (${p.disease} - Bed ${p.bedNumber})`).join(', ')}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaySchedule />
        <RecentActivity />
      </div>

      {criticalPatients.length > 0 && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Critical Patients</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600">
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Disease</th>
                  <th className="text-left px-4 py-3 font-medium">Bed</th>
                  <th className="text-left px-4 py-3 font-medium">Ward</th>
                  <th className="text-left px-4 py-3 font-medium">Doctor</th>
                </tr>
              </thead>
              <tbody>
                {criticalPatients.map(p => (
                  <tr key={p.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-gray-700">{p.disease}</td>
                    <td className="px-4 py-3"><span className="text-red-600 font-medium">{p.bedNumber}</span></td>
                    <td className="px-4 py-3 text-gray-700">{p.ward}</td>
                    <td className="px-4 py-3 text-gray-700">{p.doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
