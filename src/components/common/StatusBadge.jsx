const statusStyles = {
  Critical: 'bg-red-50 text-red-700 border-red-200',
  Stable: 'bg-blue-50 text-blue-700 border-blue-200',
  Recovering: 'bg-green-50 text-green-700 border-green-200',
  Pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  Completed: 'bg-green-50 text-green-700 border-green-200',
  Cancelled: 'bg-gray-50 text-gray-600 border-gray-200',
  Available: 'bg-green-50 text-green-700 border-green-200',
  Unavailable: 'bg-red-50 text-red-700 border-red-200',
}

export default function StatusBadge({ status, className = '' }) {
  const style = statusStyles[status] || 'bg-gray-50 text-gray-600 border-gray-200'
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border ${style} ${className}`}>
      {status}
    </span>
  )
}
