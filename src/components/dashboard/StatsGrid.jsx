import { Users, Stethoscope, CalendarCheck, AlertTriangle, Bed, Activity } from 'lucide-react'

const cards = [
  { key: 'totalPatients', label: 'Total Patients', icon: Users, color: 'bg-blue-500', desc: 'All registered' },
  { key: 'activePatients', label: 'Active Patients', icon: Activity, color: 'bg-cyan-500', desc: 'Currently admitted' },
  { key: 'criticalPatients', label: 'Critical', icon: AlertTriangle, color: 'bg-red-500', desc: 'Needs attention' },
  { key: 'availableDoctors', label: 'Available Doctors', icon: Stethoscope, color: 'bg-green-500', desc: 'On duty' },
  { key: 'occupiedBeds', label: 'Occupied Beds', icon: Bed, color: 'bg-purple-500', desc: 'Bed usage' },
  { key: 'todayAppts', label: "Today's Appointments", icon: CalendarCheck, color: 'bg-orange-500', desc: 'Scheduled' },
]

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map(({ key, label, icon: Icon, color, desc }) => (
        <div key={key} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats[key]}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
        </div>
      ))}
    </div>
  )
}
