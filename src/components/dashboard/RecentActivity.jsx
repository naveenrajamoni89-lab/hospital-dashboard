import { useHospital } from '../../context/HospitalContext'

const activityColors = {
  admission: 'bg-blue-500',
  surgery: 'bg-purple-500',
  lab: 'bg-green-500',
  cancellation: 'bg-red-500',
  appointment: 'bg-yellow-500',
  emergency: 'bg-red-500',
  discharge: 'bg-teal-500',
}

export default function RecentActivity() {
  const { activities } = useHospital()

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
      <div className="space-y-3">
        {activities.slice(0, 8).map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
            <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${activityColors[item.type] || 'bg-gray-400'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700">{item.text}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No recent activities</p>
        )}
      </div>
    </div>
  )
}
