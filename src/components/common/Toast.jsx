import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const styles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

export default function ToastContainer() {
  const { notifications, dismissNotification } = useNotification()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {notifications.map(n => {
        const Icon = icons[n.type] || icons.info
        return (
          <div key={n.id} className={`flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg animate-slide-in ${styles[n.type] || styles.info}`}>
            <Icon size={18} className="shrink-0 mt-0.5" />
            <p className="text-sm flex-1">{n.message}</p>
            <button onClick={() => dismissNotification(n.id)} className="shrink-0 hover:opacity-70 cursor-pointer">
              <X size={16} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
