import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHospital } from '../context/HospitalContext'
import Modal from '../components/common/Modal'
import AppointmentForm from '../components/appointments/AppointmentForm'
import StatusBadge from '../components/common/StatusBadge'
import EmptyState from '../components/common/EmptyState'
import LoadingSpinner from '../components/common/LoadingSpinner'
import useSort from '../hooks/useSort'
import { Search, Plus, Calendar, CalendarCheck2, CalendarX, CheckCircle, XCircle, Eye, ArrowUpDown } from 'lucide-react'

export default function Appointments() {
  const navigate = useNavigate()
  const { appointments, updateAppointmentStatus, loading } = useHospital()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const { sortFn, toggleSort, sortField, sortDir } = useSort('date')

  const statuses = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled']

  const filtered = appointments.filter(a => {
    const matchSearch = a.patient.toLowerCase().includes(search.toLowerCase()) || a.doctor.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || a.status === filter
    return matchSearch && matchFilter
  })

  const sorted = sortFn(filtered)

  const pendingCount = appointments.filter(a => a.status === 'Pending').length
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length
  const completedCount = appointments.filter(a => a.status === 'Completed').length
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length

  const statusActions = ['Confirmed', 'Completed', 'Cancelled']

  const SortTh = ({ field, children }) => (
    <th className="text-left px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort(field)}>
      <span className="inline-flex items-center gap-1 hover:text-gray-900">
        {children}
        <ArrowUpDown size={12} className={`text-gray-300 ${sortField === field ? 'text-blue-600' : ''}`} />
      </span>
    </th>
  )

  if (loading) return <LoadingSpinner size="lg" />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-500 mt-1">{appointments.length} total appointments</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition cursor-pointer">
          <Plus size={18} /> New Appointment
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1"><CalendarCheck2 size={16} className="text-yellow-500" /><span className="text-xs text-gray-500">Pending</span></div>
          <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1"><Calendar size={16} className="text-blue-500" /><span className="text-xs text-gray-500">Confirmed</span></div>
          <p className="text-2xl font-bold text-gray-900">{confirmedCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1"><CheckCircle size={16} className="text-green-500" /><span className="text-xs text-gray-500">Completed</span></div>
          <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-1"><CalendarX size={16} className="text-red-500" /><span className="text-xs text-gray-500">Cancelled</span></div>
          <p className="text-2xl font-bold text-gray-900">{cancelledCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by patient or doctor..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statuses.map(s => (
              <button key={s} onClick={() => setFilter(s)} className={`px-3 py-2 text-xs rounded-lg font-medium transition cursor-pointer ${filter === s ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <SortTh field="id">ID</SortTh>
                <SortTh field="patient">Patient</SortTh>
                <SortTh field="doctor">Doctor</SortTh>
                <SortTh field="date">Date</SortTh>
                <SortTh field="time">Time</SortTh>
                <SortTh field="type">Type</SortTh>
                <SortTh field="status">Status</SortTh>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr><td colSpan={8}><EmptyState title="No appointments found" description="Schedule a new appointment to get started" icon={CalendarX} /></td></tr>
              ) : sorted.map(a => (
                <tr key={a.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{a.id}</td>
                  <td className="px-4 py-3 text-gray-900 font-medium">{a.patient}</td>
                  <td className="px-4 py-3 text-gray-700">{a.doctor}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{a.date}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{a.time}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">{a.type}</span></td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => navigate(`/appointments/${a.id}`)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer" title="View Details"><Eye size={14} /></button>
                      {statusActions.map(action => {
                        if (a.status === action) return null
                        const icons = { Confirmed: Calendar, Completed: CheckCircle, Cancelled: XCircle }
                        const Icon = icons[action]
                        const colors = { Confirmed: 'text-blue-600 hover:bg-blue-50', Completed: 'text-green-600 hover:bg-green-50', Cancelled: 'text-red-600 hover:bg-red-50' }
                        return (
                          <button key={action} onClick={() => updateAppointmentStatus(a.id, action)} className={`p-1.5 rounded transition cursor-pointer ${colors[action]}`} title={action}>
                            <Icon size={14} />
                          </button>
                        )
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Schedule New Appointment" size="max-w-xl">
        <AppointmentForm onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  )
}
