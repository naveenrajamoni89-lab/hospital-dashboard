import { useHospital } from '../../context/HospitalContext'
import StatusBadge from '../common/StatusBadge'
import { Clock } from 'lucide-react'

export default function TodaySchedule() {
  const { appointments } = useHospital()
  const today = new Date().toISOString().split('T')[0]
  const todayAppts = appointments.filter(a => a.date === today).slice(0, 6)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
      {todayAppts.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No appointments scheduled for today</p>
      ) : (
        <div className="space-y-2">
          {todayAppts.map((a) => (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-2 text-gray-400 min-w-[75px]">
                <Clock size={13} />
                <span className="text-xs font-medium">{a.time}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{a.patient}</p>
                <p className="text-xs text-gray-500 truncate">{a.doctor} - {a.type}</p>
              </div>
              <StatusBadge status={a.status} className="shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
