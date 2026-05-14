import { Users, Stethoscope, CalendarCheck, DollarSign, Ambulance } from 'lucide-react'

const iconMap = {
  Users, Stethoscope, CalendarCheck, DollarSign, Ambulance,
}

export default function DashboardCard({ label, value, icon, change, changeType, color }) {
  const Icon = iconMap[icon]

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
          {Icon && <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />}
        </div>
        <span className={`text-sm font-medium ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'} bg-opacity-10 ${changeType === 'increase' ? 'bg-green-50' : 'bg-red-50'} px-2 py-1 rounded`}>
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  )
}
